"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import styles from "./task-board.module.css";

type Task = {
  id: string;
  title: string;
  description: string;
};

type ColumnKey = 'todo' | 'inprogress' | 'done';

type TasksState = {
  [key in ColumnKey]: Task[];
};

const initialTasks: TasksState = {
  todo: [
    { id: "1", title: "Tasarım yap", description: "UI/UX tasarımını tamamla" },
    { id: "2", title: "API entegrasyonu", description: "Backend API'yi bağla" },
  ],
  inprogress: [
    { id: "3", title: "Test et", description: "Uygulamayı test et" },
  ],
  done: [
    { id: "4", title: "Kurulum", description: "Projeyi başlat" },
  ],
};

const columns: { key: ColumnKey; title: string }[] = [
  { key: "todo", title: "Yapılacak" },
  { key: "inprogress", title: "Devam Ediyor" },
  { key: "done", title: "Tamamlandı" },
];


interface BackendTask {
  id: string;
  title: string;
  description: string;
  status: ColumnKey; // 'todo' | 'inprogress' | 'done'
}

interface TaskBoardProps {
  tasks?: BackendTask[];
}

// Backend'den gelen düz task dizisini sütunlara ayıran yardımcı fonksiyon
function groupTasksByStatus(tasks: BackendTask[] | undefined): TasksState {
  const grouped: TasksState = { todo: [], inprogress: [], done: [] };
  if (!tasks) return grouped;
  for (const t of tasks) {
    if (grouped[t.status]) grouped[t.status].push({ id: t.id, title: t.title, description: t.description });
  }
  return grouped;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  // tasks prop'u gelirse onu sütunlara ayırıp state'e al, yoksa local initialTasks'u kullan
  const [tasksState, setTasksState] = useState<TasksState>(tasks ? groupTasksByStatus(tasks) : initialTasks);
  const [editTask, setEditTask] = useState<{ col: ColumnKey; task: Task } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModal, setAddModal] = useState<{ open: boolean; col: ColumnKey | null }>({ open: false, col: null });
  const [newTask, setNewTask] = useState<{ title: string; description: string }>({ title: '', description: '' });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    let sourceCol: ColumnKey | undefined = undefined;
    let destCol: ColumnKey | undefined = undefined;
    for (const col of columns) {
      if (tasksState[col.key].find((t: Task) => t.id === active.id)) sourceCol = col.key;
    }
    for (const col of columns) {
      if (over.id === col.key) destCol = col.key;
      else if (tasksState[col.key].find((t: Task) => t.id === over.id)) destCol = col.key;
    }
    if (!sourceCol || !destCol) return;
    if (sourceCol === destCol) {
      const oldIndex = tasksState[sourceCol].findIndex((t: Task) => t.id === active.id);
      let newIndex = tasksState[destCol].findIndex((t: Task) => t.id === over.id);
      if (newIndex === -1) newIndex = tasksState[destCol].length - 1;
      setTasksState((prev) => ({
        ...prev,
        [sourceCol!]: arrayMove(prev[sourceCol!], oldIndex, newIndex),
      }));
    } else {
      const movingTask = tasksState[sourceCol].find((t: Task) => t.id === active.id);
      let insertIndex = tasksState[destCol].findIndex((t: Task) => t.id === over.id);
      if (insertIndex === -1) insertIndex = tasksState[destCol].length;
      setTasksState((prev) => {
        const newDest = [...prev[destCol!]];
        if (movingTask) newDest.splice(insertIndex, 0, movingTask);
        return {
          ...prev,
          [sourceCol!]: prev[sourceCol!].filter((t: Task) => t.id !== active.id),
          [destCol!]: newDest,
        };
      });
      // Backend'e status update isteği gönder
      if (movingTask) {
        fetch(`http://localhost:8082/task/updateStatus/${movingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: destCol }),
        })
        .then(res => {
          if (!res.ok) throw new Error('Status update failed');
          return res.json();
        })
        .then(data => {
          console.log('Status updated:', data);
        })
        .catch(err => {
          console.error('Status update error:', err);
        });
      }
    }
  };

  const handleCardClick = (col: ColumnKey, task: Task) => {
    setEditTask({ col, task });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTask(null);
  };

  const handleTaskSave = (title: string, description: string) => {
    if (!editTask) return;
    setTasksState((prev) => ({
      ...prev,
      [editTask.col]: prev[editTask.col].map((t) =>
        t.id === editTask.task.id ? { ...t, title, description } : t
      ),
    }));
    handleModalClose();
  };

  // Yeni görev ekleme fonksiyonu
  const handleAddTask = (col: ColumnKey) => {
    if (!newTask.title.trim()) return;
    // projectId prop ile geliyorsa alın (ör: props.projectId veya context)
    const projectId = (typeof window !== 'undefined' && window.location.pathname.split('/').includes('projects'))
      ? window.location.pathname.split('/').pop() : undefined;

    // Eğer assigneeId yoksa null gönder
    const taskPayload = {
      title: newTask.title,
      description: newTask.description,
      status: col,
      projectId: projectId,
      assigneeId: null // İleride kullanıcı seçimi eklenirse burası güncellenebilir
    };


    fetch("http://localhost:8082/task/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskPayload),
    })
      .then(res => {
        console.log(projectId);
        console.log(taskPayload);
        if (!res.ok) throw new Error("Görev eklenemedi");
        return res.text();
      })
      .then(_ => {
        // Görev başarıyla eklendikten sonra, ilgili projenin görevlerini backend'den çek
        if (projectId) {
          fetch(`http://localhost:8082/task/getByProjectId/${projectId}`)
            .then(res => {
              if (!res.ok) throw new Error("Görevler alınamadı");
              return res.json();
            })
            .then((tasks: BackendTask[]) => {
              setTasksState(groupTasksByStatus(tasks));
            })
            .catch(err => {
              alert("Görevler güncellenemedi: " + err.message);
            });
        }
      })
      .catch(err => {
        alert("Görev eklenemedi: " + err.message);
      });

    setNewTask({ title: '', description: '' });
    setAddModal({ open: false, col: null });
  };

  // Görev silme fonksiyonu
  const handleDeleteTask = (id: string) => {
    // projectId'yi route'dan tekrar al
    const projectId = (typeof window !== 'undefined' && window.location.pathname.split('/').includes('projects'))
      ? window.location.pathname.split('/').pop() : undefined;
    fetch(`http://localhost:8082/task/delete/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Görev silinemedi");
        // Silme sonrası görevleri tekrar çek
        if (projectId) {
          fetch(`http://localhost:8082/task/getByProjectId/${projectId}`)
            .then(res => {
              if (!res.ok) throw new Error("Görevler alınamadı");
              return res.json();
            })
            .then((tasks: BackendTask[]) => {
              setTasksState(groupTasksByStatus(tasks));
            })
            .catch(err => {
              alert("Görevler güncellenemedi: " + err.message);
            });
        }
      })
      .catch(err => alert("Görev silinemedi: " + err.message));
  };

  return (
    <>
      <div className={styles.boardContainer}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className={styles.columnsWrapper}>
            {columns.map((col) => (
              <SortableContext
                key={col.key}
                items={tasksState[col.key].map((t: Task) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className={styles.columnContainer}>
                  <div
                    className={styles.addCardBox}
                    onClick={() => setAddModal({ open: true, col: col.key })}
                    title="Görev Ekle"
                  >
                    <span className={styles.addCardText}>Add Card</span>
                    <span className={styles.addTaskCircleButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="#1976d2" strokeWidth="2.5" fill="#fff"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    </span>
                  </div>
                  <TaskColumn
                    title={col.title}
                    tasks={tasksState[col.key]}
                    columnKey={col.key}
                    onCardClick={(task: Task) => handleCardClick(col.key, task)}
                    onDelete={handleDeleteTask}
                  />
                </div>
              </SortableContext>
            ))}
          </div>
        </DndContext>
      </div>
      {/* Modal for adding a new card */}
      {addModal.open && addModal.col && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Yeni Görev Oluştur</h3>
            <input
              type="text"
              placeholder="Başlık"
              className={styles.modalInput}
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Açıklama"
              className={styles.modalTextarea}
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className={styles.modalActions}>
              <button
                className={styles.modalButton}
                onClick={() => handleAddTask(addModal.col!)}
              >Ekle</button>
              <button className={styles.modalButton} onClick={() => setAddModal({ open: false, col: null })}>İptal</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal for editing a card */}
      {modalOpen && editTask && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Görev Düzenle</h3>
            <input
              type="text"
              defaultValue={editTask.task.title}
              className={styles.modalInput}
              id="edit-title"
            />
            <textarea
              defaultValue={editTask.task.description}
              className={styles.modalTextarea}
              id="edit-desc"
            />
            <div className={styles.modalActions}>
              <button
                className={styles.modalButton}
                onClick={() => {
                  const title = (document.getElementById("edit-title") as HTMLInputElement).value;
                  const desc = (document.getElementById("edit-desc") as HTMLTextAreaElement).value;
                  handleTaskSave(title, desc);
                }}
              >Kaydet</button>
              <button className={styles.modalButton} onClick={handleModalClose}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBoard;

"use client";
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

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<TasksState>(initialTasks);
  const [editTask, setEditTask] = useState<{ col: ColumnKey; task: Task } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    let sourceCol: ColumnKey | undefined = undefined;
    let destCol: ColumnKey | undefined = undefined;
    // Kaynağı bul
    for (const col of columns) {
      if (tasks[col.key].find((t: Task) => t.id === active.id)) sourceCol = col.key;
    }
    // Hedefi bul: Eğer bir kartın üstüne bırakıldıysa, o kartın bulunduğu sütun; boş alana bırakıldıysa sütun id'si
    for (const col of columns) {
      if (over.id === col.key) destCol = col.key;
      else if (tasks[col.key].find((t: Task) => t.id === over.id)) destCol = col.key;
    }
    if (!sourceCol || !destCol) return;
    if (sourceCol === destCol) {
      // Aynı sütunda sıralama
      const oldIndex = tasks[sourceCol].findIndex((t: Task) => t.id === active.id);
      let newIndex = tasks[destCol].findIndex((t: Task) => t.id === over.id);
      // Eğer boş alana bırakıldıysa, en sona ekle
      if (newIndex === -1) newIndex = tasks[destCol].length - 1;
      setTasks((prev) => ({
        ...prev,
        [sourceCol!]: arrayMove(prev[sourceCol!], oldIndex, newIndex),
      }));
    } else {
      // Farklı sütuna taşıma
      const movingTask = tasks[sourceCol].find((t: Task) => t.id === active.id);
      let insertIndex = tasks[destCol].findIndex((t: Task) => t.id === over.id);
      // Eğer boş alana bırakıldıysa, en sona ekle
      if (insertIndex === -1) insertIndex = tasks[destCol].length;
      setTasks((prev) => {
        const newDest = [...prev[destCol!]];
        if (movingTask) newDest.splice(insertIndex, 0, movingTask);
        return {
          ...prev,
          [sourceCol!]: prev[sourceCol!].filter((t: Task) => t.id !== active.id),
          [destCol!]: newDest,
        };
      });
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
    setTasks((prev) => ({
      ...prev,
      [editTask.col]: prev[editTask.col].map((t) =>
        t.id === editTask.task.id ? { ...t, title, description } : t
      ),
    }));
    handleModalClose();
  };

  return (
    <>
      <div className={styles.boardContainer}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className={styles.columnsWrapper}>
            {columns.map((col) => (
              <SortableContext
                key={col.key}
                items={tasks[col.key].map((t: Task) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <TaskColumn
                  title={col.title}
                  tasks={tasks[col.key]}
                  columnKey={col.key}
                  onCardClick={(task: Task) => handleCardClick(col.key, task)}
                />
              </SortableContext>
            ))}
          </div>
        </DndContext>
      </div>
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

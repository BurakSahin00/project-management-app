import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./task-board.module.css";

type Task = {
  id: string;
  title: string;
  description: string;
};

interface SortableItemProps {
  id: string;
  task: Task;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, task, onClick, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const [hovered, setHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className={`${styles.card} ${isDragging ? styles.cardDragging : ''}`}
      style={{ transform: CSS.Transform.toString(transform), transition, position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Silme butonu */}
      {hovered && (
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          title="Görevi Sil"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 2,
            opacity: 0.85,
            padding: 2,
            transition: 'opacity 0.2s',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      )}
      <div
        className={styles.cardDragHandle}
        {...listeners}
        title="Taşı"
        onClick={e => e.stopPropagation()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>
      </div>
      <div className={styles.cardContent} onClick={onClick}>
        <div className={styles.cardTitle}>{task.title}</div>
        <div className={styles.cardDescription}>{task.description}</div>
      </div>
    </div>
  );
};

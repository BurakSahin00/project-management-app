import React from "react";
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
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className={`${styles.card} ${isDragging ? styles.cardDragging : ''}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
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

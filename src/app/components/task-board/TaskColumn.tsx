import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableItem } from "./TaskCard";
import styles from "./task-board.module.css";

type Task = {
  id: string;
  title: string;
  description: string;
};

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  columnKey: string;
  onCardClick?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, columnKey, onCardClick, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: columnKey });
  return (
    <div className={styles.column} ref={setNodeRef}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <div className={styles.cardsWrapper}>
        {tasks.map((task) => (
          <SortableItem
            key={task.id}
            id={task.id}
            task={task}
            onClick={() => onCardClick && onCardClick(task)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;

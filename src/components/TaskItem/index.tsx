import React from 'react';
import styles from './TaskItem.module.css';

export interface Task {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

interface TaskItemProps {
  task: Task;
  highlighted?: boolean;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, highlighted, onClick }) => {
  let endDateStr = '';
  if (!task.endDate) {
    console.log('Task:', task);
    endDateStr = 'Yok';
  } else {
    const end = new Date(task.endDate);
    if (isNaN(end.getTime())) {
      endDateStr = task.endDate;
    } else {
      endDateStr = end.toLocaleDateString('tr-TR');
    }
  }
  return (
    <li
      className={highlighted ? styles.taskItem + ' ' + styles.highlighted : styles.taskItem}
      tabIndex={0}
      aria-current={highlighted ? 'true' : undefined}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      role="button"
      aria-label={`Görev: ${task.title}`}
    >
      <div className={styles.title}>{task.title}</div>
      <div className={styles.dates}>
        <span>Bitiş: <b>{endDateStr}</b></span>
      </div>
    </li>
  );
};

export default TaskItem;

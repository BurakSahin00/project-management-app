import React from 'react';
import styles from './TaskList.module.css';

import TaskItem, { Task } from '../TaskItem/index';

interface TaskListProps {
  tasks: Task[];
  highlightedTaskId?: string;
  onTaskClick: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, highlightedTaskId, onTaskClick }) => (
  <div className={styles.taskListWrapper}>
    <h3 className={styles.title}>Görevler</h3>
    {tasks.length === 0 ? (
      <div className={styles.noTasks}>Bu projede görev yok.</div>
    ) : (
      <ul className={styles.list}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            highlighted={task.id === highlightedTaskId}
            onClick={() => onTaskClick(task.id)}
          />
        ))}
      </ul>
    )}
  </div>
);

export default TaskList;

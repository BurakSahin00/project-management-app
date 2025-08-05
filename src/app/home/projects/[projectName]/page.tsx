"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import TaskBoard from '../../../components/task-board/TaskBoard';

// Örnek veri, gerçek projeyi global state veya API'den alabilirsin
const dummyProjects = [
  {
    name: "Proje Adı",
    slug: "proje-adi",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "active",
    stack: ["React", "Node.js", "MongoDB"],
    startDate: "2025-08-01",
    endDate: "2025-08-31"
  },
  {
    name: "Proje 2",
    slug: "proje-2",
    description: "",
    status: "completed",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    startDate: "2025-07-01",
    endDate: "2025-07-31"
  },
  {
    name: "Proje 3",
    slug: "proje-3",
    description: "Proje 3 açıklaması",
    status: "active",
    stack: ["Express", "MongoDB", "React"],
    startDate: "2025-06-01",
    endDate: "2025-06-30"
  },
  {
    name: "Proje 4",
    slug: "proje-4",
    description: "Proje 4 açıklaması",
    status: "completed",
    stack: ["Vue.js", "Node.js", "MySQL"],
    startDate: "2025-05-01",
    endDate: "2025-05-31"
  }
];

const ProjectDetails = () => {
  const params = useParams();
  const projectSlug = decodeURIComponent(params.projectName as string);
  const project = dummyProjects.find(p => p.slug === projectSlug);

  if (!project) return <div>Proje bulunamadı.</div>;

  return (
    <>
      <div className={styles.projectDetailContainer}>
        <div className={styles.projectDetailHeader}>
          <h2 className={styles.projectDetailTitle}>{project.name}</h2>
          <div className={styles.projectDetailDescription}>
            {project.description}
          </div>
          <div className={styles.projectDetailStackContainer}>
            <strong>Tech Stack:</strong>
            <ul className={styles.projectDetailStackList}>
              {project.stack.map((tech, idx) => (
                <li key={idx} className={styles.projectDetailStackItem}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.projectDetailContainer} style={{ marginTop: 32 }}>
        <TaskBoard />
      </div>
    </>
  );
};

export default ProjectDetails;

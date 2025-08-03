import React from 'react'
import ProjectCard from '@/app/components/project-card/ProjectCard'
import styles from './page.module.css';
import { ProjectCardProps } from '@/app/components/project-card/ProjectCard';

const ProjectCards: ProjectCardProps[] = [
    {
        name: "Proje Adı",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        status: "active",
        stack: ["React", "Node.js", "MongoDB"],
        startDate: "2025-08-01",
        endDate: "2025-08-31"
    },
    {
        name: "Proje 2",
        description: "Proje 2 açıklaması",
        status: "completed",
        stack: ["Next.js", "TypeScript", "PostgreSQL"],
        startDate: "2025-07-01",
        endDate: "2025-07-31"
    },
    {
        name: "Proje 3",
        description: "Proje 3 açıklaması",
        status: "active",
        stack: ["Express", "MongoDB", "React"],
        startDate: "2025-06-01",
        endDate: "2025-06-30"
    },
    {
        name: "Proje 4",
        description: "Proje 4 açıklaması",
        status: "completed",
        stack: ["Vue.js", "Node.js", "MySQL"],
        startDate: "2025-05-01",
        endDate: "2025-05-31"
    }
];

const Projects: React.FC = () => {
  return (
    <div className={styles.projectContainer}>
      {ProjectCards.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  )
}

export default Projects

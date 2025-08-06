import React from 'react'
import styles from './project-card.module.css';


export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: string; // ör: 'active', 'completed', 'pending', 'archived' vs. backend ile uyumlu olmalı
  stack: string[];
  startDate: string;
  endDate: string;
  cardColor?: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, cardColor, image }) => {
  return (
    <div className={styles.projectCard + (cardColor ? ' ' + styles.coloredCard : '')}>
      {image ? (
        <img src={image} alt="Proje Fotoğrafı" className={styles.projectImage} />
      ) : (
        <div className={styles.projectImage + ' ' + styles.colorImage} />
      )}
      <h3>{name}</h3>
    </div>
  )
}

export default ProjectCard

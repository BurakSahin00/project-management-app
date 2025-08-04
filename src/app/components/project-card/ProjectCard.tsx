import React from 'react'
import styles from './project-card.module.css';
import { spec } from 'node:test/reporters';

export type ProjectCardProps = {
    name: string;
    description: string;
    status: 'active' | 'completed';
    stack: string[];   
    startDate: string;
    endDate: string;
    cardColor?: string; // Kart arka plan rengi
    image?: string;     // Kart fotoğrafı (opsiyonel)
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

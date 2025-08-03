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
    cardColor?: string; // Optional prop for card background color  
}

const ProjectCard: React.FC<ProjectCardProps> = ({  name, description, status, startDate, endDate, cardColor, stack }) => {
  return (
    <div className={styles.projectCard} style={{ backgroundColor: cardColor || '#f5f5f5' }}>
      <h3>{name}</h3>
      <h4>{status}</h4>
      <p>{description}</p>
      <hr />
      <div className={styles.techStack}>
        <strong>Tech Stack:</strong>
        <ul>
          {stack.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProjectCard

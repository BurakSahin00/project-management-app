import React from 'react';
import styles from './ProjectDropdown.module.css';

export interface Project {
  id: string;
  name: string;
}

interface ProjectDropdownProps {
  projects: Project[];
  selectedProjectId: string;
  onChange: (projectId: string) => void;
}

const ProjectDropdown: React.FC<ProjectDropdownProps> = ({ projects, selectedProjectId, onChange }) => (
  <div className={styles.dropdownWrapper}>
    <label htmlFor="project-select" className={styles.label}>Proje Seç:</label>
    <select
      id="project-select"
      className={styles.select}
      value={selectedProjectId}
      onChange={e => onChange(e.target.value)}
      aria-label="Proje seçimi"
    >
      <option value="">-- Proje Seçin --</option>
      {projects.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  </div>
);

export default ProjectDropdown;

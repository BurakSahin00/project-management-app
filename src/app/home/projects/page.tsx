"use client";
import React, { useEffect, useState } from 'react';
import ProjectCard from '@/app/components/project-card/ProjectCard';
import styles from './page.module.css';
import Link from 'next/link';
import { ProjectCardProps } from '@/app/components/project-card/ProjectCard';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // localStorage'dan userId al
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    if (!userId) {
      setError('Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8082/project/getByUserId/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Projeler yüklenemedi.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Projeler yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.projectContainer}>
      {projects.map((project, index) => (
        <Link href={`/home/projects/${project.id || ''}`} key={index} style={{ textDecoration: 'none' }}>
          <ProjectCard {...project} />
        </Link>
      ))}
    </div>
  );
};

export default Projects;

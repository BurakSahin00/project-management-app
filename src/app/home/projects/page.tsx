"use client";
import React, { useEffect, useState } from 'react';
import AddProjectModal from '@/app/components/AddProjectModal';
import ProjectCard from '@/app/components/project-card/ProjectCard';
import styles from './page.module.css';
import Link from 'next/link';
import { ProjectCardProps } from '@/app/components/project-card/ProjectCard';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  // Yeni proje ekleme fonksiyonu (API'ya post atılabilir)
  const handleAddProject = (name: string) => {
    // Gerçek backend ile entegre etmek için burada POST isteği atılabilir
    // Şimdilik frontend'de ekle
    const newProject: ProjectCardProps = {
      id: Math.random().toString(36).substring(2, 10),
      name,
      description: '',
      status: 'active',
      stack: [],
      startDate: '',
      endDate: '',
    };
    setProjects(prev => [newProject, ...prev]);
  };

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
        // Proje adına göre resim dosyası belirle
        const imageMap: Record<string, string> = {
          'Proje A': '/projecta.png',
          'Proje B': '/projectb.png',
          'Proje C': '/projectc.png',
          'Proje D': '/projectd.png',
        };
        const projectsWithImages = data.map((project: any) => {
          const name = String(project.name);
          return {
            ...project,
            image: imageMap[name] || undefined
          };
        });
        setProjects(projectsWithImages);
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
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '40px 0 8px 0', paddingLeft: '140px' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: 0,
            textAlign: 'left',
          }}
        >
          Projeler
        </h1>
        <button
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginLeft: 8,
            transition: 'background 0.2s',
          }}
          onClick={() => setAddModalOpen(true)}
        >
          + Proje Ekle
        </button>
      </div>
      <AddProjectModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddProject} />
      <div className={styles.projectContainer}>
        {projects.map((project, index) => (
          <Link href={`/home/projects/${project.id || ''}`} key={index} style={{ textDecoration: 'none' }}>
            <ProjectCard {...project} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Projects;

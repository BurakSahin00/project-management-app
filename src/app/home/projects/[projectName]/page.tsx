"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import TaskBoard from '../../../components/task-board/TaskBoard';

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params.projectName as string; // projectName paramı aslında id ise
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Proje detayını çek
    fetch(`http://localhost:8082/project/getById/${projectId}`)
      .then(res => {
        if (!res.ok) throw new Error('Proje bulunamadı');
        return res.json();
      })
      .then(data => {
        setProject(data);
      })
      .catch(() => {
        setProject(null);
      });
    // Taskları çek
    fetch(`http://localhost:8082/task/getByProjectId/${projectId}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Tasklar yüklenemedi.');
        setLoading(false);
      });
  }, [projectId]);

  if (loading) return <div>Tasklar yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Proje başlığı ve açıklaması */}
      <div className={styles.projectHeaderBox}>
        <div>
          <h1 className={styles.projectTitle}>
            {project?.name || 'Proje Adı Bulunamadı'}
          </h1>
          <p className={styles.projectDescription}>
            {project?.description || 'Açıklama bulunamadı.'}
          </p>
        </div>
      </div>
      <div className={styles.projectDetailContainer}>
        <TaskBoard tasks={tasks} />
      </div>
    </>
  );
};

export default ProjectDetails;

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
    // Proje detayını çekmek istiyorsan burada fetch ile çekebilirsin
    // Şimdilik sadece taskları çekiyoruz:
    fetch(`http://localhost:8082/task/getByProjectId/${projectId}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        console.log(data);
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
      {/* Proje detaylarını ayrıca çekmek istersen burada gösterebilirsin */}
      <div className={styles.projectDetailContainer} style={{ marginTop: 32 }}>
        <TaskBoard tasks={tasks} />
      </div>
    </>
  );
};

export default ProjectDetails;

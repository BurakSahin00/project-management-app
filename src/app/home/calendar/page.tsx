"use client";
import React, { useEffect, useState } from 'react';
// Kendi modern takvim gridimizi oluşturacağız
import styles from './page.module.css';

type Project = {
  id: string;
  name: string;
};


type Task = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};



const CalendarPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // ay/yıl için
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Projeleri çek
  useEffect(() => {
    // TODO: userId'yi uygun şekilde alın
    const userId = localStorage.getItem('userId') || '';
    if (!userId) return;
    fetch(`http://localhost:8082/project/getByUserId/${userId}`)
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  // Proje seçilince taskleri çek
  useEffect(() => {
    if (selectedProject) {
      fetch(`http://localhost:8082/task/getByProjectId/${selectedProject}`)
        .then(res => res.json())
        .then(data => setTasks(data));
    } else {
      setTasks([]);
    }
  }, [selectedProject]);


  // Yardımcı: Ayın kaç günü var?
  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Yardımcı: Haftanın ilk günü (0: Pazar, 1: Pazartesi...)
  function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }

  // Yardımcı: Gün başlıkları (Pzt, Sal, ...)
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Takvim gridini oluştur
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = (getFirstDayOfWeek(year, month) + 6) % 7; // Pazartesi ile başlat

  // Takvim hücreleri: önce boşluklar, sonra günler
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  // Gün tıklanınca seçili gün state
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    setSelectedDay(new Date(year, month, day));
  };

  return (
    <div className={styles.calendarPage}>
      <div className={styles.headerRow}>
        <h2 className={styles.pageTitle}>Takvim</h2>
        <div className={styles.viewSwitcher}>
          <button className={styles.viewSwitcherBtn + ' ' + styles.active}>Ay</button>
          {/* Diğer görünümler eklenebilir: Gün, Hafta, Yıl */}
        </div>
      </div>
      <div className={styles.projectSelectRow}>
        <label htmlFor="project-select">Proje Seç:</label>
        <select
          id="project-select"
          value={selectedProject}
          onChange={e => setSelectedProject(e.target.value)}
        >
          <option value="">-- Proje Seçin --</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.calendarMainGrid}>
        {/* Sol: Takvim kutusu */}
        <div className={styles.leftPanelBox}>
          <div className={styles.calendarBoxTitle}>Takvim</div>
          <div className={styles.customCalendarHeader}>
            <button className={styles.calNavBtn} onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>{'<'}</button>
            <span className={styles.calMonthLabel}>
              {currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}
            </span>
            <button className={styles.calNavBtn} onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>{'>'}</button>
          </div>
          <div className={styles.customCalendarGrid}>
            {/* Gün başlıkları */}
            {weekDays.map((wd, i) => (
              <div key={wd} className={styles.calWeekDay}>{wd}</div>
            ))}
            {/* Günler */}
            {calendarCells.map((day, i) => {
              if (!day) return <div key={i} className={styles.calDayEmpty}></div>;
              const cellDate = new Date(year, month, day);
              const isToday = cellDate.toDateString() === new Date().toDateString();
              const isSelected = selectedDay && cellDate.toDateString() === selectedDay.toDateString();
              // O güne ait taskler
              const dayTasks = tasks.filter(
                t =>
                  new Date(t.startDate).toDateString() === cellDate.toDateString() ||
                  new Date(t.endDate).toDateString() === cellDate.toDateString() ||
                  (new Date(t.startDate) < cellDate && new Date(t.endDate) > cellDate)
              );
              return (
                <div
                  key={i}
                  className={
                    styles.calDay +
                    (isToday ? ' ' + styles.calDayToday : '') +
                    (isSelected ? ' ' + styles.calDaySelected : '')
                  }
                  onClick={() => handleDayClick(day)}
                >
                  <div className={styles.calDayNum}>{day}</div>
                  {dayTasks.length > 0 && (
                    <ul className={styles.taskList}>
                      {dayTasks.map(task => (
                        <li key={task.id} className={styles.taskItem}>{task.title}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Sağ: Görev kartları kutusu */}
        <div className={styles.tasksPanel}>
          <h3 className={styles.tasksPanelTitle}>Görevler</h3>
          {tasks.length === 0 ? (
            <div className={styles.noTasks}>Bu projede görev yok.</div>
          ) : (
            <ul className={styles.tasksList}>
              {tasks.map(task => {
                const now = new Date();
                const start = new Date(task.startDate);
                const end = new Date(task.endDate);
                const totalMs = end.getTime() - start.getTime();
                const leftMs = end.getTime() - now.getTime();
                const leftDays = Math.max(Math.ceil(leftMs / (1000 * 60 * 60 * 24)), 0);
                return (
                  <li key={task.id} className={styles.taskCard}>
                    <div className={styles.taskCardTitle}>{task.title}</div>
                    <div className={styles.taskCardDates}>
                      <span>Başlangıç: <b>{start.toLocaleDateString('tr-TR')}</b></span>
                      <span>Bitiş: <b>{end.toLocaleDateString('tr-TR')}</b></span>
                    </div>
                    <div className={styles.taskCardDuration}>
                      {leftMs > 0
                        ? <span>Kalan: <b>{leftDays} gün</b></span>
                        : <span style={{color:'#d32f2f'}}>Süre doldu</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

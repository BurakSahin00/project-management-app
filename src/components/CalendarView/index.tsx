import React from 'react';
import styles from './CalendarView.module.css';

export interface Task {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export type CalendarMode = 'month' | 'week' | 'day';

interface CalendarViewProps {
  tasks: Task[];
  mode: CalendarMode;
  currentDate: Date;
  onModeChange: (mode: CalendarMode) => void;
  onDateChange: (date: Date) => void;
  onTaskClick: (taskId: string) => void;
  highlightedTaskId?: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  mode,
  currentDate,
  onModeChange,
  onDateChange,
  onTaskClick,
  highlightedTaskId
}) => {
  // Görev rengi: deadline geçmişse kırmızı, devam ediyorsa yeşil
  const getTaskColor = (task: Task) => {
    if (!task.endDate) return '#bdbdbd';
    const deadline = new Date(task.endDate);
    const today = new Date();
    deadline.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    if (deadline < today) return '#e53935'; // kırmızı
    return '#43a047'; // yeşil
  };

  // Yardımcı: Ayın kaç günü var?
  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }
  // Haftanın ilk günü (0: Pazar, 1: Pazartesi...)
  function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = (getFirstDayOfWeek(year, month) + 6) % 7; // Pazartesi ile başlat
  // Takvim hücreleri: önce boşluklar, sonra günler
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <div className={styles.calendarViewWrapper}>
      <div className={styles.header}>
        <button onClick={() => onDateChange(new Date(year, month - 1, 1))} aria-label="Önceki Ay" className={styles.navBtn}>{'<'}</button>
        <span className={styles.monthLabel}>{currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => onDateChange(new Date(year, month + 1, 1))} aria-label="Sonraki Ay" className={styles.navBtn}>{'>'}</button>
        <div className={styles.modeSwitcher}>
          <button className={mode === 'month' ? styles.active : ''} onClick={() => onModeChange('month')}>Ay</button>
          <button className={mode === 'week' ? styles.active : ''} onClick={() => onModeChange('week')}>Hafta</button>
          <button className={mode === 'day' ? styles.active : ''} onClick={() => onModeChange('day')}>Gün</button>
        </div>
      </div>
      <div className={styles.calendarGrid} style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6,width:'100%'}}>
        {/* Gün başlıkları */}
        {weekDays.map((wd) => (
          <div key={wd} style={{textAlign:'center',fontWeight:600,color:'#7c4dff',padding:'8px 0'}}>{wd}</div>
        ))}
        {/* Günler */}
        {calendarCells.map((day, i) => {
          if (!day) return <div key={i} style={{background:'#f8f8ff',minHeight:56}}></div>;
          const cellDate = new Date(year, month, day);
          const isToday = cellDate.toDateString() === new Date().toDateString();
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
              style={{
                minHeight: 74,
                background: isToday ? '#f3eafe' : '#fff',
                color: isToday ? '#7c4dff' : '#222',
                border: isToday ? '2px solid #7c4dff' : '1.5px solid #f0f0f0',
                borderRadius: 12,
                fontWeight: isToday ? 700 : 500,
                position: 'relative',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '10px 6px 4px 12px',
                cursor: dayTasks.length > 0 ? 'pointer' : 'default',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                fontSize: '1.08rem',
                boxShadow: dayTasks.length > 0 ? '0 2px 8px rgba(124,77,255,0.08)' : undefined
              }}
              tabIndex={dayTasks.length > 0 ? 0 : -1}
              aria-label={dayTasks.length > 0 ? `Görevli gün: ${day}` : `Gün: ${day}`}
            >
              <div style={{fontSize:'1.18rem',fontWeight:700,marginBottom:6}}>{day}</div>
              {dayTasks.length > 0 && (
                <ul style={{margin:0,padding:0,listStyle:'none',display:'flex',flexDirection:'column',gap:2,width:'100%'}}>
                  {dayTasks.map(task => (
                    <li
                      key={task.id}
                      style={{
                        background: highlightedTaskId === task.id ? '#1976d2' : getTaskColor(task),
                        color: '#fff',
                        borderRadius: 6,
                        fontSize: 12,
                        padding: '2px 8px',
                        marginBottom: 2,
                        display: 'block',
                        fontWeight: 500,
                        boxShadow: '0 1px 4px rgba(25,118,210,0.10)',
                        letterSpacing: '0.01em',
                        textAlign: 'center',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                        outline: highlightedTaskId === task.id ? '2px solid #222' : undefined
                      }}
                      tabIndex={0}
                      aria-current={highlightedTaskId === task.id ? 'true' : undefined}
                      onClick={() => onTaskClick(task.id)}
                      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onTaskClick(task.id)}
                      aria-label={`Görev: ${task.title}`}
                    >
                      {task.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;

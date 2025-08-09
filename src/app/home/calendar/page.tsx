
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProjectDropdown, { Project } from "@/components/ProjectDropdown";
import CalendarView, { Task, CalendarMode } from "@/components/CalendarView";
import TaskList from "@/components/TaskList";

const CalendarPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mode, setMode] = useState<CalendarMode>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    if (!userId) return;
    fetch(`http://localhost:8082/project/getByUserId/${userId}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);


  useEffect(() => {
    if (selectedProjectId) {
      fetch(`http://localhost:8082/task/getByProjectId/${selectedProjectId}`)
        .then((res) => res.json())
        .then((data) => setTasks(
          data.map((task: any) => ({
            ...task,
            endDate: task.deadline || '',
            startDate: task.startDate || task.deadline || ''
          }))
        ));
    } else {
      setTasks([]);
    }
    setHighlightedTaskId(undefined);
  }, [selectedProjectId]);

  return (
    <div className={styles.calendarPage}>
      <ProjectDropdown
        projects={projects}
        selectedProjectId={selectedProjectId}
        onChange={setSelectedProjectId}
      />
      <div className={styles.mainGrid}>
        <CalendarView
          tasks={tasks}
          mode={mode}
          currentDate={currentDate}
          onModeChange={setMode}
          onDateChange={setCurrentDate}
          onTaskClick={setHighlightedTaskId}
          highlightedTaskId={highlightedTaskId}
        />
        <TaskList
          tasks={tasks}
          highlightedTaskId={highlightedTaskId}
          onTaskClick={setHighlightedTaskId}
        />
      </div>
    </div>
  );
};

export default CalendarPage;

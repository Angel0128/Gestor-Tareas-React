import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    //inicializar directamente con lo que haya en localstorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const pendingCount = tasks.filter((tasks) => !tasks.completed).length;
  const completedCount = tasks.filter((tasks) => tasks.completed).length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const getProgressColor = () => {
    if (progress === 0) return "#d9534f";      // Rojo
    if (progress < 50) return "#f0ad4e";       // Amarillo
    if (progress < 100) return "#5bc0de";      // Celeste
    return "#5cb85c";                          // Verde (100%)
};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>📋 Gestor de Tareas</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />

        <div className={styles.stats}>
          <p className={styles.pending}>Tareas Pendientes: {pendingCount}</p>
          <p className={styles.completed}>
            Tareas Completadas: {completedCount}
          </p>
        </div>

        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progress}%`,
              backgroundColor: getProgressColor(),
            }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

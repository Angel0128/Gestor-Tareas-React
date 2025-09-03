import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const editTask = (updatedTask) =>
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const getProgressColor = () => {
    if (progress === 0) return "#d9534f";
    if (progress < 50) return "#f0ad4e";
    if (progress < 100) return "#5bc0de";
    return "#5cb85c";
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/*Formulario independiente arriba */}
        <TaskForm addTask={addTask} />

        {/*Grid de tareas */}
        <div className={styles.taskSection}>
          <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
        </div>

        {/*Estadísticas y barra de progreso */}
        <div className={styles.stats}>
          <p className={styles.pending}>Pendientes: {pendingCount}</p>
          <p className={styles.completed}>Completadas: {completedCount}</p>
        </div>

        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%`, backgroundColor: getProgressColor() }}
          >
            {progress}%
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

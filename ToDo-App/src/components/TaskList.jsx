import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

function TaskList({ tasks, deleteTask, editTask }) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>No hay tareas. ¡Agrega una!</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default TaskList; []

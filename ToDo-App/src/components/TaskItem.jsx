import { useState } from "react";
import styles from "./TaskItem.module.css";

function TaskItem({ task, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text || "");
  const [category, setCategory] = useState(task.category || "Trabajo");

  const handleSave = () => {
    if (!text.trim()) return;
    editTask({ ...task, text: text.trim(), category });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setText(task.text || "");
    setCategory(task.category || "Trabajo");
  };

  const toggleComplete = () => {
    editTask({ ...task, completed: !task.completed }); //`
  };

  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ""}`}>
      <div className={styles.left}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
        />
        {isEditing ? (
          <div className={styles.editing}>
            <input
              className={styles.editInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <select
              className={styles.editSelect}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Trabajo</option>
              <option>Personal</option>
              <option>Estudio</option>
            </select>
          </div>
        ) : (
          <div className={styles.content}>
            <span className={styles.text}>{task.text}</span>
            <span className={styles.category}>
              [{task.category ?? "General"}]
            </span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button className={styles.saveBtn} onClick={handleSave}>
              Guardar
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;

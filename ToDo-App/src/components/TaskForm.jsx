import { useState } from "react";
import styles from "./TaskForm.module.css";

const MAX = 80;

function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Trabajo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("El título no puede estar vacío");
      return;
    }
    if (text.trim().length > MAX) {
      alert(`Máx ${MAX} caracteres`);
      return;
    }
    addTask({
      id: Date.now(),
      text: text.trim(),
      category,
      completed: false,
    });
    setText("");
    setCategory("Trabajo");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una nueva tarea (máx 80 chars)"
      />
      <select
        className={styles.select}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Trabajo</option>
        <option>Personal</option>
        <option>Estudio</option>
      </select>
      <button className={styles.button} type="submit">
        + Agregar
      </button>
    </form>
  );
}

export default TaskForm;

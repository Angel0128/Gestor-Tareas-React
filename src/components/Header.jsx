import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>📋 Gestor de Tareas</h1>
      <p className={styles.subtitle}>Organiza tus pendientes fácilmente</p>
    </header>
  );
}

export default Header;

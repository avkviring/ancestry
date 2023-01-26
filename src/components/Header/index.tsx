import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__title}>ancestry</div>
    </header>
  );
}

export default Header;

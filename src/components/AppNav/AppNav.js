import styles from "./AppNav.module.scss";

function AppNav() {
  return (
    <nav>
      <ul className={styles.main}>
        <li>Start page</li>
        <li>Building</li>
        <li>Floor</li>
      </ul>
    </nav>
  );
}

export default AppNav;

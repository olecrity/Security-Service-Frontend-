import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.scss";


function AppNav() {
  return (
    <nav className={styles.nav}>
       <a className={styles.logo_section_1} > 
          <img className={styles.logo_img} src="../../logo123.png" alt=""/>
       </a>
      <ul className={styles.main}>
        <li>
          <NavLink className={styles.pages} to="/" className={({ isActive }) => isActive ? `${styles.pages} ${styles.active}` : styles.pages}>Start page</NavLink>
        </li>
        <li>
          <NavLink className={styles.pages} to="/house" className={({ isActive }) => isActive ? `${styles.pages} ${styles.active}` : styles.pages}>Building</NavLink>
        </li>
        <li>
          <NavLink className={styles.pages} to="/floor" className={({ isActive }) => isActive ? `${styles.pages} ${styles.active}` : styles.pages}>Floor</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;

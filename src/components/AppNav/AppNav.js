import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.scss";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.main}>
        <li>
          <NavLink to="/">Start page</NavLink>
        </li>
        <li>
          <NavLink to="/house">Building</NavLink>
        </li>
        <li>
          <NavLink to="/floor">Floor</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;

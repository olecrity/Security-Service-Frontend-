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

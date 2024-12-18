import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.scss";
import { useBuilding } from "../../contexts/BuidingContext";

function AppNav() {
  const { currentFloor } = useBuilding();

  return (
    <nav className={styles.nav}>
      <a className={styles.logo_section_1}>
        <img className={styles.logo_img} src="../../logo123.png" alt="" />
      </a>
      <ul className={styles.main}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.pages} ${styles.active}` : styles.pages
            }
          >
            Start page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/house"
            className={({ isActive }) =>
              isActive ? `${styles.pages} ${styles.active}` : styles.pages
            }
          >
            Building
          </NavLink>
        </li>
        <li>
          {currentFloor != null ? (
            <NavLink
              to="/floor"
              className={({ isActive }) =>
                isActive ? `${styles.pages} ${styles.active}` : styles.pages
              }
            >
              Floor
            </NavLink>
          ) : (
            <a className={styles["pages-inactive"]}>Floor</a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;

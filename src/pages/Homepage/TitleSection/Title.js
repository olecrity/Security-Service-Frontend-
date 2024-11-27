import { useAuth } from "../../../contexts/AuthContext";
import { useBuilding } from "../../../contexts/BuidingContext";
import styles from "./Title.module.scss";

function Title({ onLoginClick, onSignupClick }) {
  const { isAuthenticated } = useAuth();
  const { logoutAll } = useBuilding();
  return (
    <div className={styles.main_title_section}>
      <h3 className={styles.main_caption}>Secure Building</h3>
      <span className={styles.decoration}></span>
      <p className={styles.description}>
        This is the web service that creates the simulation of the building
        secure system work.
      </p>
      <div className={styles.button_section1}>
        <button
          className={
            isAuthenticated ? styles.non_active : styles.main_title_btn
          }
          onClick={onLoginClick}
        >
          <a className={styles.navigation}>
            <p>log in</p>
          </a>
        </button>
        <button
          className={
            isAuthenticated
              ? styles.non_active
              : styles.main_title_btn + " " + styles.sign_up
          }
          onClick={onSignupClick}
        >
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>sign up</p>
          </a>
        </button>
        <button
          className={
            isAuthenticated ? styles.main_title_btn : styles.non_active
          }
          onClick={logoutAll}
        >
          {/* після входу ця кнопка стає видимою та кнопки "log in" та "sign up" змінюють клас на "non_active", а кнопка "log out" на клас "main_title_btn" */}
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>log out</p>
          </a>
        </button>
      </div>
    </div>
  );
}

export default Title;

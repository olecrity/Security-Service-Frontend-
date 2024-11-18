import styles from "./Footer.module.scss";

function Guide() {
  return (
    <ul className={styles.guide_page}>
      <li className={styles.guide_section}>
        <h3> Authorization</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Show information</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Resume Simulation</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Continue to simulation</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Create building structure</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Building options</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Simulation actions</h3>
        <p></p>
      </li>
      <li className={styles.guide_section}>
        <h3> Sensors and deactivation</h3>
        <p></p>
      </li>
    </ul>
  );
}

export default Guide;
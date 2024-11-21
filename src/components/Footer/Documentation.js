import styles from "./Footer.module.scss";

function Documentation() {
  return (
   <div className={styles.documentation_page}>
      <h3> Current Structure of the project</h3>
        <img className={styles.section_img} src="../../027.png" alt=""/>
        <img className={styles.section_img} src="../../122.png" alt=""/>
        <img className={styles.section_img} src="../../137.png" alt=""/>
        <img className={styles.section_img} src="../../150.png" alt=""/>
        <img className={styles.section_img} src="../../104.png" alt=""/>
        <img className={styles.section_img} src="../../110.png" alt=""/>
   </div>
  );
}

export default Documentation;
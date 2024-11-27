import styles from "./Information.module.scss";

function Information() {
  return (
    <div className={styles.second_section_documantation}>
      <h3>Saved information</h3>
      <textarea id="Logs"></textarea>
    </div>
  );
}

export default Information;

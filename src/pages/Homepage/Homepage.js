import styles from "./Homepage.module.scss";
import Title from "./TitleSection/Title";
import PastSimulations from "./PastSimulations/PastSimulations";
import Dialog from "./Dialog/Dialog";
import Information from "./Information/Information.js";

function Homepage() {
  return (
    <div className={styles.main}>
      <Title></Title>
      <Dialog></Dialog>
      <div className={styles.second_section}>
        <PastSimulations></PastSimulations>
        <Information></Information>
      </div>
    </div>
  );
}

export default Homepage;

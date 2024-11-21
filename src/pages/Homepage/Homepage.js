import styles from "./Homepage.module.scss";
import { useState } from "react";

import Title from "./TitleSection/Title";
import PastSimulations from "./PastSimulations/PastSimulations";
import Dialog from "./Dialog/Dialog";
import Information from "./Information/Information.js";

function Homepage() {
  const [isDialogVisible, setIsDialogVisible] = useState(false); // State for dialog visibility
  const [dialogMode, setDialogMode] = useState("login"); // State for dialog mode

  const openDialog = (mode) => {
    setDialogMode(mode);
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <div className={styles.main}>
      <Title
        onLoginClick={() => openDialog("login")}
        onSignupClick={() => openDialog("signup")}
      />
      {isDialogVisible && <Dialog mode={dialogMode} onClose={closeDialog} />}
      <div className={styles.second_section}>
        <PastSimulations />
        <Information />
      </div>
    </div>
  );
}

export default Homepage;

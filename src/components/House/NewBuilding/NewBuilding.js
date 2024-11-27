import { useState } from "react";
import { useBuilding } from "../../../contexts/BuidingContext";
import styles from "./NewBuilding.module.scss";
import { useAuth } from "../../../contexts/AuthContext";

function NewBuilding() {
  const { handleCreateBuilding, isFinalized } = useBuilding();
  const { isAuthenticated } = useAuth();

  const [numFloors, setNumFloors] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [isFormValid, setIsFormValid] = useState(true); // Додано для перевірки форми

  const handleSubmit = () => {
    if (!numFloors || !floorArea) {
      setIsFormValid(false); // Якщо поля не заповнені, форма не валідна
      return;
    }
    
    // Якщо все заповнено, викликаємо handleCreateBuilding і ховаємо форму
    handleCreateBuilding(numFloors, floorArea);
    setIsFormValid(true);
    document.querySelector(`.${styles["new-building"]}`).classList.add(styles["hidden"]);
  };

  return (
    <div className={styles["new-building"]}>
      <input
        className={styles["new-building-input"]}
        type="text"
        placeholder="Enter number of floors"
        value={numFloors}
        onChange={(e) => setNumFloors(e.target.value)}
      />
      <input
        className={styles["new-building-input"]}
        type="text"
        placeholder="Enter floor area"
        value={floorArea}
        onChange={(e) => setFloorArea(e.target.value)}
      />
      {!isFormValid && (
        <p className={styles["error-message"]}>Both fields are required!</p> // Повідомлення про помилку
      )}
      <div className={styles["new-building-button-container"]}>
        <button
          onClick={
            isFinalized
              ? () => {}
              : () => handleCreateBuilding(numFloors, floorArea)
          }
          className={
            isAuthenticated && !isFinalized
              ? styles["new-building-btn"]
              : styles["btn-inactive"]
          }
        >
          <a className={styles.navigation}>
            <p className={styles.main_btn_text}>Start Creation</p>
          </a>
        </button>
      </div>
    </div>
  );
}

export default NewBuilding;
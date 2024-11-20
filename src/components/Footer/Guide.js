import styles from "./Footer.module.scss";

function Guide() {
  return (
    <ul className={styles.guide_page}>
      <li className={styles.guide_section}>
        <h3> Authorization</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>First of all, in order to start your simulation, it is required to authorize your identity. So you can either log in to your existing account or create a new one. Here is the small guide about authorization: 
          <br/>1. Go to the Start page and click the "log in" button if you already have account or the "sign up" button.
          <br/>2. Enter desired username to login or sign up.
          <br/>3. Click the Submit button to proceed or the Cancel button( close icon) to stop the authorization.
          <br/>After that, you will be able to see your previous saved states of your simulations(if you have any) or proceed with a new one.
        </p>
      </li>
      <li className={styles.guide_section}>
        <h3> Show information</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>You can choose the previous saved simulation and click the "Show information" button on the Start page in order to check the information about the simulation that you had before. 
          <br/>This information will be shown in the Saved information area.</p>
      </li>
      <li className={styles.guide_section}>
        <h3> Resume Simulation</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>This button will restore the saved state of the previous simulation that you have chosen in the Past simulations section and it will redirect you to the Building page in order to proceed with your current simulation.</p>
      </li>
      <li className={styles.guide_section}>
        <h3> Continue to simulation</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>By clicking on this button you can go to the Building section where you can check the current state of the building and the simulation of the security system.</p>
      </li>
      <li className={styles.guide_section}>
        <h3> Building options</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>In the Building page you can check the current building structure in the Simulation building section. Also you can change the current shown(create the new) building structure in the following way:
          <br/>1. You can add floors by clicking the "Add T1", "Add T2" or "Add T3" buttons. 
          <br/>2. It is possible to remove unwanted floors by clicking on the cross icon in the table of the temporal building structure.
          <br/>3. Then you acn submit the created building structure by clicking the "Submit structure" button.
          <br/>4. The new structure of the building will be shown in the "Simulation building" section.</p>
      </li>

      <li className={styles.guide_section}>
        <h3> Simulation building section</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>In this section you can see all the floors you have added and their current state. If the floor is shown red, it means that one of the sensors got the signal and it is required to check the floor and deactivate the sensor (if wanted).
        <br/> Also, in each floor you can see 4 little squares with a colored dot and a digit, the dot shows a particular type of the sensor and the digit shows the general amount of all sensors of this type on the floor.
        </p>
      </li>
      <li className={styles.guide_section}>
        <h3> Simulation actions</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>In this section you can check the current state of the simulation and makre several actions with the simulation of the Security system. You have the next options: Start, Stop, Resume, and Save(the current state of) the simulation.</p>
      </li>
      <li className={styles.guide_section}>
        <h3> Floor page</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>On this page you can see the actual state of the chosen floor with each of rooms(including with the alarmed rooms indication, where the sensor worked).
          <br/>By clicking on the particular floor, you can check the list of the floor sensors and deactivate the sensors that worked. Or you can just close the sensors section.
          <br/>Also, you can see the same section with the simulation options(you can read more detailed guide about them in the "Building options" section.)
        </p>
      </li>
      <li className={styles.guide_section}>
        <h3> Project</h3>
        <div className={styles.guide_caption_underline}></div>
        <p>This is just a page with description of the project parts and related Github repositories.</p>
      </li>
    </ul>
  );
}

export default Guide;
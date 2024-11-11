import styles from "./Homepage.module.scss";

function Homepage() {
  return (
    <div className={styles.main}>
      <h3 className={styles.main_caption}>Secure Building</h3>
      <span className={styles.decoration}></span>
      <p className={styles.description}>
        This is the web service that creates the simulation of the building
        secure system work.
      </p>
      <div className={styles.button_section1}>
        <button className={styles.main_title_btn}>
          <a className={styles.navigation}>
            <p>log in</p>
          </a>
        </button>
        <button className={styles.main_title_btn + " " + styles.sign_up}>
          <a className={styles.navigation}>
            <p>sign up</p>
          </a>
        </button>
        <button className={styles.non_active}>
          {/* після входу ця кнопка стає видимою та кнопки "log in" та "sign up" змінюють клас на "non_active", а кнопка "log out" на клас "main_title_btn" */}
          <a className={styles.navigation}>
            <p>log out</p>
          </a>
        </button>
      </div>
      <dialog id={styles.form_block}>
        {" "}
        {/* зміни айді на form_block_active для показу форми  */}
        <div className={styles.dialog_header}>
          <h3 id={styles.dialog_header_text}>Log in</h3>
          <button className={styles.close_modal}>
            {" "}
            {/*кнопка для виходу з форми*/}
            <i className="fa-solid fa-xmark close_form  close_img"></i>
          </button>
        </div>
        <form className={styles.form} method="dialog">
          <div id={styles.valid_error} className={styles.non_active}></div>
          <div className={styles.error + " " + styles.non_active}></div>
          <label for="name" className={styles.namelabel}>
            Userame
          </label>
          <img className="img_input1" src="../img/Vector.png" alt="" />
          <input
            type="text"
            id={styles.FromName}
            className={styles.name + " " + styles._req}
            required
            name="login"
            placeholder="Enter your username"
            aria-describedby="Name"
          />{" "}
          <br />
          <label for="password" className={styles.passwordlabel}>
            Password
          </label>
          <img
            className={styles.img_input2}
            src="../img/Vector (1).png"
            alt=""
          />
          <input
            type="password"
            id={styles.FromPassword}
            className={styles.name + " " + styles._req}
            required
            aria-describedby="passwordHelp"
            placeholder="Enter your password"
          />{" "}
          <br />
          <div className={styles.dialog_submit}>
            <button id={styles.submitData}>Submit</button>
            <button id={styles.cancel_submit} formnovalidate="formnovalidate">
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <div className={styles.second_section}>
        <div className={styles.second_section_simulations}>
          <h3>Past simulations</h3>
          <table></table>
          <div className={styles.button_section2}>
            <button className={styles.main_title_btn2}>
              <a className={styles.navigation}>
                <p>Show information</p>
              </a>
            </button>
            <button className={styles.main_title_btn2}>
              <a className={styles.navigation}>
                <p>Resume simulation</p>
              </a>
            </button>
            <div className={styles.button_section3}>
              <button className={styles.main_title_btn2}>
                <a className={styles.navigation}>
                  <p>Continute to simulation</p>
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.second_section_documantation}>
          <h3>Saved information</h3>
          <textarea></textarea>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

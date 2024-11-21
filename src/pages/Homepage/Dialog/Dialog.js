import styles from "./Dialog.module.scss";

function Dialog({ mode, onClose }) {
    return ( 
        <dialog id={styles.form_block_active} open>  {/* зміни айді на form_block_active для показу форми  */}
            <div className={styles.dialog_header}>
            <h3 id={styles.dialog_header_text}>{mode === "login" ? "Log in" : "Sign up"}</h3>
            <button className={styles.close_modal} onClick={onClose}> {/*кнопка для виходу з форми*/}
                <i className="fa-solid fa-xmark close_form  close_img"></i>
            </button>
            </div>

            <form className={styles.form} method="dialog">
            <div id={styles.valid_error} className={styles.non_active}>
            </div>
            <div className={styles.error + ' ' + styles.non_active}></div>

            <label for="name" className={styles.namelabel}>Userame</label>
            <img className="img_input1" src="../img/Vector.png" alt=""/>
            <input type="text" id={styles.FromName} className={styles.name + ' ' + styles._req} required name="login" placeholder="Enter your username" aria-describedby="Name" /> <br />
            
            {/* <label for="password" className={styles.passwordlabel}>Password</label>
            <img className={styles.img_input2} src="../img/Vector (1).png" alt=""/>
            <input type="password" id={styles.FromPassword} className={styles.name + ' ' + styles._req} required aria-describedby="passwordHelp"placeholder="Enter your password" /> <br /> */}

            <div className={styles.dialog_submit}>
                <button id={styles.submitData} onClick={onClose}>Submit</button>
                <button id={styles.cancel_submit} onClick={onClose} formnovalidate="formnovalidate">Cancel</button>
            </div>
            </form>
        </dialog>
    );
}

export default Dialog;
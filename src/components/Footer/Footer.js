import styles from "./Footer.module.scss";

function Footer() {
  return (
   <footer>
    <div className={styles.footer_main_section}>
    <div className={styles.footer_section}>
        <a className={styles.footer_main_section} >
        </a>
        <p className={styles.part0_footer}>Solution designed and builders company for all your needs</p>
    </div>
    <div className={styles.footer_section}>
        <h3>News</h3>
        <p className={styles.part0_footer} ><a className={styles.navigation} >Terms of Service</a></p>
        <p className={styles.part0_footer}><a className={styles.navigation} >Privacy Policy</a></p>
    </div>
    <div className={styles.footer_section}>
        <h3>Company</h3>
        <p className={styles.part0_footer}><a className={styles.navigation} >Privacy Policy</a></p>
        <p className={styles.part0_footer}><a className={styles.navigation} >Privacy Policy</a></p>
        <p className={styles.part0_footer}><a className={styles.navigation} >Privacy Policy</a></p>
        <p className={styles.part0_footer}><a className={styles.navigation} >Privacy Policy</a></p>
    </div>
    <div className={styles.footer_section}>
        <div className={styles.contact_img_section}>
            {/* <img className={styles.footer_contact_img} src="#" alt="">
            <img className={styles.footer_contact_img} src="#" alt=""> */}
        </div>
    </div>
    </div>
    <div className={styles.footer_rights}>
        <p>© 2023 All rights reserved</p>
    </div>
    
</footer>
  );
}

export default Footer;

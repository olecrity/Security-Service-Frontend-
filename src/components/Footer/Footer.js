import styles from "./Footer.module.scss";

function Footer() {
  return (
   <footer>
        <div className={styles.footer_main_section}>
            <div className={styles.footer_section + ' ' + styles.footer_logo_section}>
                <a className={styles.footer_section_1} > 
                    <img className={styles.footer_contact_img} src="../../logo123.png" alt=""/>
                </a>
                <p className={styles.part0_footer}>Solution designed and builders company for all your needs</p>
            </div>
            <div className={styles.footer_section}>
                <h3>System</h3>
                <p className={styles.part3_footer} ><a className={styles.navigation} >Terms of Service</a></p>
                <p className={styles.part3_footer}><a className={styles.navigation} >Privacy Policy</a></p>
            </div>
            <div className={styles.footer_section}>
                <h3>Usage</h3>
                <p className={styles.part3_footer}><a className={styles.navigation} >Documentation</a></p>
                <p className={styles.part3_footer}><a className={styles.navigation} >Privacy Policy</a></p>
            </div>
            <div className={styles.footer_section}>
                <div className={styles.contact_link_section}>
                <h3>Links</h3>
                <p className={styles.part3_footer}><a className={styles.navigation} >Github</a></p>
                </div>
            </div>
        </div>
        <div className={styles.footer_rights}>
            <p>© 2024 All rights reserved</p>
        </div>
        
    </footer>
  );
}

export default Footer;

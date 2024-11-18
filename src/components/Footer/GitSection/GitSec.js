import styles from "./GitSec.module.scss";

function GitSection(sec_details) {
    console.log(sec_details.values.image)
  return (
    <div className={styles.github_section}>
       <img className={styles.section_img} src={sec_details.values.image} alt=""/>
        <h3 >{sec_details.values.title}</h3>
        <p className={styles.description}>{sec_details.values.description}</p>
        <div className={styles.github_link_section}>
            <p className={styles.cap}>Github link: </p> 
            <a className={styles.link_section} href={sec_details.values.repository_link} target="_blank" rel="noopener noreferrer"> repository of {sec_details.values.title}</a>
        </div>

    </div>
  );
}

export default GitSection;
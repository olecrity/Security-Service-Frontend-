import styles from "./Footer.module.scss";
import GitSection from "./GitSection/GitSec";

function GitHub() {

  var details = [{
    id: 1,
    title: "Frontend",
    image: "../../front-end.png",
    description: "The frontend of this application is the client-facing part of the project that interacts directly with the user. The primary purpose of the frontend is to fetch, display, and manage data dynamically from the backend API and provide a responsive interface.",
    repository_link: "https://github.com/olecrity/Security-Service-Frontend-"
  }];

  var backend = {
    id: 2,
    title: "Backend",
    image: "../../backend.png",
    description: "The backend of a web application is the server-side part responsible for processing data, performing business logic, and ensuring seamless communication between the user interface (frontend) and the database or other external systems.",
    repository_link: "https://github.com/Orester0/KP_teamproject_back"
  }

  var database = {
    id: 3,
    title: "Database",
    image: "../../database.png",
    description: "A database is a structured collection of data that is stored and managed to support efficient retrieval, modification, and storage of information. In the context of a project, it serves as the backbone for managing and persisting application data.",
    repository_link: "https://ijahdsciuhqw9reyugadfliuhaweoiuhaswdfkjhbaedf.com"
  }

  details.push(backend);
  details.push(database);


  return (
    <div className={styles.github_page}>
      <GitSection values={details[0]}></GitSection>
      <GitSection values={details[1]}></GitSection>
      <GitSection values={details[2]}></GitSection>
    </div>
    
  );
}

export default GitHub;
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.message}>Sorry, but the page is not found...</h1>
      <Link to="/" className={styles.link}>
        Back home
      </Link>
    </div>
  );
}

export default NotFoundPage;
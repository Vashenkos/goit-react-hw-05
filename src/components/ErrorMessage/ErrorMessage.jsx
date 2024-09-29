import styles from "./ErrorMessage.module.css";

function ErrorMessage() {
  return (
    <div className={styles.container}>
      <p className={styles.message}>Something went wrong! Please try again.</p>
    </div>
  );
}

export default ErrorMessage;
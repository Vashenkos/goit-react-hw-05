import styles from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;
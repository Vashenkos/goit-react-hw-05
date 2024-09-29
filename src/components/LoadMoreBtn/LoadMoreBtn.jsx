import styles from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick }) {
  return (
    <div >
      <button  onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;
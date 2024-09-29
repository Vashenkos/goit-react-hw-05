import { PulseLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <PulseLoader color="#b43feb" />
    </div>
  );
};

export default Loader;
import styles from "./App.module.css";
import Tasks from "./components/Tasks/Tasks";

export default function App() {
    return (
      <>
      <div className={styles.main}>
        <Tasks />
      </div>
      </>
    );
}

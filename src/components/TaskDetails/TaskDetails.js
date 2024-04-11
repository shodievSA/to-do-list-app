import styles from "./TaskDetails.module.css";
import CancelButton from "../Buttons/CancelButton/CancelButton";
import { useEffect, useState } from "react";

function TaskDetails(props) {

    const [showSaveButton, setShowSaveButton] = useState(false);
    const [inputValue, setInputValue] = useState("");

    function closeWindow() {
        props.setShowDetails(false)
    }

    function editTask(e) {
        setShowSaveButton(true);
        setInputValue(e.target.value);
    }

    useEffect(() => {
        setInputValue(props.taskClicked.text)
    }, [])

  return (
    <>
    <div className={styles.taskDetails}>
      <div className={styles.closeButton}>
        <CancelButton onClick={closeWindow} />
      </div>
      <div className={styles.inputs}>
        <div className={styles.task}>
          <label className={styles.textAreaLabel}>Task:</label>
          <textarea value={inputValue} className={styles.taskTextArea} onChange={(e) => editTask(e)} />  
        </div>
        <div className='taskDescription'>
          <textarea value={props.taskClicked.description} className={styles.descriptionTextArea} placeholder='Description'/>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.list}>
          <label className={styles.listLabel}>List:</label>
          <select className={styles.dropDown}>
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>
        </div>
        <div className={styles.dueDate}>
          <label className={styles.dateLabel}>Due date:</label>
          <input type='date' className={styles.dateInput} />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.deleteTaskButton}>Delete Task</button>
        {showSaveButton && <button className={styles.saveChangesButton}>Save Changes</button>}
      </div>
    </div>
    </>
  )
}

export default TaskDetails;
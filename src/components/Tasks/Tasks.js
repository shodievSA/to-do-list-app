import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import styles from "./Tasks.module.css";

export default function Tasks() 
{
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function handleKeyDown(event) 
    {
      if (event.key === "Enter") addTask();
    }

    function handleInput(e) 
    {
        setInputValue(e.target.value);
    }

    function addTask() 
    {
        inputValue !== "" &&
        setTasks([{ text : inputValue, isFinished : false, description : "" }, ...tasks]);
        setInputValue("");
    }

    function handleCheckbox(task) 
    {
        setTasks(tasks.filter(item => {
            return item !== task;
        }))

        setTasks(prevState => {
            return [...(task.isFinished ? [ {...task, isFinished: false}, ...prevState] : [...prevState, {...task, isFinished: true} ])]
        })
    }

    function deleteTask(task)
    {
      setTasks(tasks.filter((item) => 
      {
        return item !== task;
      }))
    }

    useEffect(() => 
    {
        if (localStorage.hasOwnProperty("tasks")) 
        {
          setTasks(JSON.parse(localStorage.getItem("tasks")));
        }
    }, []);

    useEffect(() => {
        if (tasks.length >= 0) 
        {
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

  return (
    <>
    <div className={styles.homePage}>
      <div className={styles.heading}>
        <h1>Today</h1>
        <div className={styles.tasksLeft}>
        {tasks.filter((item) => {
            return item.isFinished === false;
        }).length}
        </div>
      </div>
      <div className={styles.createTaskInput}>
        <div>
          <input 
          placeholder="Type here..." 
          value={inputValue} 
          onKeyDown={handleKeyDown} 
          onChange={handleInput} 
          />
          { inputValue !== "" && 
          <IoAddCircleSharp 
          className={styles.icon} 
          onClick={addTask} 
          /> 
          }
        </div>
      </div>
      <div className={styles.tasks}>
        {tasks.length > 0 ? (
          tasks.map((item, index) => {
            return (
              <div className={styles.task} key={index}>
                <input type="checkbox" checked={item.isFinished ? true : false} className={styles.check} onChange={() => handleCheckbox(item)} />
                <input readOnly={true} type="text" style={{ textDecoration: item.isFinished ? "line-through" : "none"}} className={styles.input} value={item.text} />
                <FaTrash className={styles.removeTask} onClick={() => deleteTask(item)} />
              </div>
            )
          })
        ) : (
          <h2 style={{ fontSize: 30 }}>Your to-do list is currently empty</h2>
        )}
      </div>
    </div>
    </>
  )

}

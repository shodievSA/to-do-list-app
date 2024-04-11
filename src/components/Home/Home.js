import { useState, useEffect } from 'react';
import styles from "./Home.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";

export default function Home(props) 
{
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const inputStyles = {
    width: props.showDetails ? "90%" : "70%"
  }

  function handleKeyDown(event)
  {
    event.key === "Enter" && 
    addTask();
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

  useEffect(() => 
  {
    if (localStorage.hasOwnProperty("tasks"))
    {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  useEffect(() => 
  {
    if (tasks.length > 0)
    {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function expandTask(task) 
  {
    props.setShowDetails(true);
    props.setTaskClicked(task);
  }

  return (
    <>
    <div className={styles.home}>
      <div className={styles.heading}>
        <h1>Today</h1>
        <div className={styles.tasksLeft}>
          <h3>
            {tasks.filter(item => {
              return item.isFinished === false;
            }).length}
          </h3>
        </div>
      </div>
      <div className={styles.createTask}>
        <div className={styles.input_container} style={inputStyles}>
          <input placeholder="Type here..." value={inputValue} type="text" className={styles.main_input} onKeyDown={handleKeyDown} onChange={handleInput} />
          { inputValue !== "" && <IoAddCircleSharp className={styles.icon} onClick={addTask} /> }
        </div>
      </div>
      <div className={styles.tasks}>
        {tasks.length > 0 ? (
          tasks.map((item) => {
            return (
              <div className={styles.task} style={inputStyles}>
                <input type="checkbox" checked={item.isFinished ? true : false} className={styles.check} onChange={() => handleCheckbox(item)} />
                <input readOnly="true" type="text" style={{ textDecoration: item.isFinished ? "line-through" : "none"}} className={styles.input} value={item.text} />
                <MdExpandMore className={styles.expand_button} onClick={() => expandTask(item)} />
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

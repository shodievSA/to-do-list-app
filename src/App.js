import { Routes, Route } from "react-router";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Upcoming from "./components/Upcoming/Upcoming";
import Calendar from "./components/Calendar/Calendar";
import StickyWall from "./components/StickyWall/StickyWall";
import Settings from "./components/Settings/Settings";
import SignOut from "./components/SignOut/SignOut";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import styles from "./App.module.css";
import { useLocation } from "react-router";
import { useState } from "react";

export default function App() 
{
  const { pathname } = useLocation();

  const [taskClicked, setTaskClicked] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const gridFormat = {
    gridTemplateColumns: pathname === "/" && showDetails ? "1fr 2.5fr 1.5fr" : "1fr 4fr"
  }

  return (
    <>
    <div className={styles.main} style={gridFormat}>
      <Menu />
      <Routes>
        <Route path="/" element={
          <>
          <Home showDetails={showDetails} setShowDetails={setShowDetails} setTaskClicked={setTaskClicked} />
          {showDetails && <TaskDetails taskClicked={taskClicked} setShowDetails={setShowDetails} /> }
          </>
        } />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/sticky-wall" element={<StickyWall />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </div>
    </>
  );
}

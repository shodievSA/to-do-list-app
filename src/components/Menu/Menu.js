import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineCalendar, AiOutlinePlus} from "react-icons/ai";
import { MdToday, MdOutlineExitToApp } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { HiChevronDoubleRight } from "react-icons/hi";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <>
    <div className={styles.menu}>
		<div className={styles.tasks}>
			<div style={{fontWeight: 900}}>TASKS</div>	
			<NavLink className={styles.link} to={"/upcoming"} style={({ isActive }) => {
				return isActive ? { backgroundColor: "rgb(210, 210, 210)", fontWeight: 800} : {}
			}}>
				<HiChevronDoubleRight className={styles.icon} />
				<span>Upcoming</span>
			</NavLink>

			<NavLink className={styles.link} to={"/"} style={({ isActive }) => {
				return isActive ? { backgroundColor: "rgb(210, 210, 210)", fontWeight: 800} : {}
			}}>
				<MdToday className={styles.icon} />
				<span>Today</span>
			</NavLink>

			<NavLink className={styles.link} to={"/calendar"} style={({ isActive }) => {
				return isActive ? { backgroundColor: "rgb(210, 210, 210)", fontWeight: 800} : {}
			}}>
				<AiOutlineCalendar className={styles.icon} />
				<span>Calendar</span>
			</NavLink>

            <NavLink className={styles.link} to={"/sticky-wall"} style={({ isActive }) => {
				return isActive ? { backgroundColor: "rgb(210, 210, 210)", fontWeight: 800} : {}
			}}>
				<FaRegStickyNote className={styles.icon} />
				<span>Sticky Wall</span>
			</NavLink>
		</div>
        <div className={styles.lists}>
			<span style={{fontWeight: 900}}>LISTS</span>
			<div className={styles.add_new_list_button}>
				<AiOutlinePlus style={{marginRight: 10, marginLeft: 10}}/>
				<span >Add New List</span>
			</div>
		</div>
		<div className={styles.settings}>
			<NavLink className={styles.link} to={"/settings"} style={({ isActive }) => {
				return isActive ? { backgroundColor: "rgb(210, 210, 210)", fontWeight: 800} : {}
			}}>
			    <LuSettings2 className={styles.icon} />
			    <span>Settings</span>
		    </NavLink>

		    <NavLink className={styles.link} to={"/sign-out"} style={({ isActive }) => {
				return isActive ? { backgroundColor: "rgb(210, 210, 210)", fontWeight: 800} : {}
			}}>
			    <MdOutlineExitToApp className={styles.icon} />
			    <span>Sign out</span>
		    </NavLink>
		</div>
    </div>
    </>
  )
}

export default Menu;
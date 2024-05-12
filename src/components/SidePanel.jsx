import { useContext,useRef, useState,useEffect } from "react"
import "../assets/css/SidePanel.scss"
import { PanelContext } from "../contexts/PanelContextProvider";
import { TodolistContext } from "../contexts/TodolistContextProvider";
import analyticsIcon from "../assets/analytics.svg"
import timer from "../assets/timer.svg"
import todoList from "../assets/todoList.svg"
import settings from "../assets/settings.svg"
import arrowExpand from "../assets/todo-list-logos/arrowExpand.svg"
import addIcon from "../assets/plus.svg"
// import {TextField,Button} from '@mui/material';
// import { createTheme,ThemeProvider,colors } from "@mui/material";
import { PanelHeader } from '../components/PanelHeader'
import { CollapsedPanelHeader } from '../components/CollapsedPanelHeader'
import TodoList from "./TodoList";

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: colors.grey[700],
//         },
//         secondary:{
//             main: colors.common['white'],
            
//         }
//     },
// })

export const SidePanel = () => {
    const panelRef = useRef();
    const collapseButtonRef = useRef();
    const arrowIconRef = useRef();
    const [showTodo,setShowTodo] = useState(false); //new state
    const [addNew, setAddNew] = useState(false);

    const { setTask, addItem } = useContext(TodolistContext);
    const { collapse, handleCollapse, handleTodoList } = useContext(PanelContext);



    const handleTodoExpand = () => {
        if (arrowIconRef.current.className.includes("expanded")) {
            arrowIconRef.current.style.transform = "rotate(0deg)";
            arrowIconRef.current.className = "arrow-icon";
            setShowTodo(!showTodo);
            setAddNew(false);
        }
        else {
            arrowIconRef.current.style.transform = "rotate(90deg)"
            arrowIconRef.current.className = "arrow-icon expanded";
            setShowTodo(!showTodo);
            
        }
        
    }
    return (
        <>
            <div className={`panel-container ${!collapse ? "collapse" : ""}`} ref={panelRef}>
                <PanelHeader></PanelHeader>
                <CollapsedPanelHeader></CollapsedPanelHeader>
                
                <div className="panel-content">
                    <ul className='menu-list'>
                        <li className="menu-item">
                            <img src={analyticsIcon} className='menu-icon' alt="" />
                            <p>Analytics</p>
                        </li>
                        <li className="menu-item">
                            <img src={timer} className='menu-icon' alt="" />
                            <p>Timer</p>
                        </li>
                        <li className="menu-item" onClick={handleTodoList}>
                            <img src={todoList} className='menu-icon' alt="" />
                            <p>To-Do List</p>
                            <div className="arrow-icon-container" onClick={handleTodoExpand}>
                                <img src={arrowExpand} ref={ arrowIconRef } className="arrow-icon" alt=""/>
                            </div>
                        </li>
                        {showTodo && <div className="Todo-list-container">
                            <TodoList></TodoList>
                                    </div>}
                            {addNew && <input type="text" className="text-box" placeholder="Enter a Task" onChange = {(events) => setTask(events.target.value)}/>}
                            {addNew && <button className="btn" onClick = {addItem}>Add</button> }
                        {/* <ThemeProvider theme={theme}>
                            {addNew && <TextField
                                    type="text"
                                    className="text-box"
                                    label="Task"
                                    placeholder="Enter a Task"
                                    color="secondary"
                                    onChange = {(events) => setTask(events.target.value)}
                                    />}
                                    <input type="text" className="text-box" placeholder="Enter a Task" onChange = {(events) => setTask(events.target.value)}/>
                            {addNew && <Button variant="contained" onClick = {addItem}>Add</Button> }
                        </ThemeProvider> */}
                    </ul>


                </div>
                <div className="bottom-part">
                    <img src={addIcon} alt="" className="add-icon" onClick={()=>setAddNew(!addNew)}/>
                    <div className="panel-footer">
                        <ul className="menu-list">
                            <li className="menu-item">
                                <img src={settings} className='menu-icon' alt="" />
                                <p>Setting</p>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className='width-adjuster' ref={collapseButtonRef}>
                <div className='width-line' onClick={handleCollapse}>
                </div>
            </div>
        </>

    )
}
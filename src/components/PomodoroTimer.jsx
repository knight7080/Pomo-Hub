import React, { useContext, useEffect,useState } from 'react'
import pauseIcon from "../assets/pause.svg";
import playIcon from "../assets/play.svg";
import "../assets/css/PomodoroTimer.scss";
import stopIcon from "../assets/stop.svg";
import resetIcon from "../assets/reset.svg";
import reloadIcon from "../assets/reload.svg";
import editIcon from "../assets/edit.svg"
import { TimerContext } from '../contexts/TimerContextProvider';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

//STATES THAT NEED GOLBALLY

import { useTimer } from '@mzaleski/use-timer';

export const PomodoroTimer = () => {

    const { minutes, seconds, handleTimerState, resetTimer, isFrozen, timerCompleted, setTimerCompleted,localStorageReset,editSession,setEditSession, session, setSession } = useContext(TimerContext);
    // const { timeRemaining, secondsRemaining, setFreeze, resetTimer,isFrozen } = useTimer(60, true,
    //     () => console.log('Timer finished!')
    // );

    // let timeObj = new Date(secondsRemaining * 1000);
    // var minutes = timeObj.getUTCMinutes()
    // var seconds = timeObj.getSeconds();

    // const handleTimerState = () => {
    //     isFrozen ? setFreeze(false) : setFreeze(true);
    // }
    
    return (
        <div className='timer-content-container'>
            <div className="timer-container">
                <div className='minutes-container'>{minutes.toString().padStart(2, '0')}</div>
                
                <div className="button-container">
                    <img src={
                        timerCompleted ? reloadIcon : (isFrozen ? playIcon : pauseIcon) 
                    } alt="" onClick={() => handleTimerState()} className="pause-play-icon" />
                    
                    <img className="pause-play-icon" src={stopIcon} alt="" onClick={() => 
                    {
                        resetTimer(true);
                        setTimerCompleted(false)
                    } 
                    } />

                </div>
                <div className='seconds-container'>{ seconds.toString().padStart(2,'0') }</div>
            </div>
            <div className="timer-session-container">
                <div className='session-container'>
                    { session.completed } / {editSession ? <input className="session-editor" type="number" onChange={(events)=>setSession({...session, total: parseInt(events.target.value)})}/> : session.total}
                    <img src={editIcon} alt="" onClick={() => setEditSession(!editSession)} className="reset-icon" />
                    <img src={resetIcon} alt="" onClick={() => localStorageReset('TIMER_SESSION_STATE')} className="reset-icon" />
                </div>
                
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition: Slide
                />
        </div>
    );
}
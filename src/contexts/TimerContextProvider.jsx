import { createContext,  useEffect, useState } from "react";
import { useTimer }  from '@mzaleski/use-timer';
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { Howl, Howler } from 'howler';
export const TimerContext = createContext({});
import path from "path";
import sound_path from "/sounds/alarm.mp3"

export default function TimerContextProvider({ children }) {
    
    const timerSetting = {
        "work-mode" : 1,
        "short-break": 1, //change later.
        "long-break" : 20
    }
    const [timerMode, setTimerMode] = useState("work-mode");
    //BUG: TIMER SESSION RESETS ONCE WE RELOD THE PAGE
    const [timerCompleted, setTimerCompleted] = useState(false);
    const [initialTimer, setInitialTimer] = useState(timerSetting["work-mode"]);
    const [editSession,setEditSession] = useState(false);
    const [session,setSession] = useState({
        completed: 0,
        total: 0,
    })

    useEffect(() => {
        setInitialTimer(timerSetting[timerMode])
    },[timerMode,session.completed])

    //
    useEffect(() => {
        const data = window.localStorage.getItem('SESSION_DATA');
        console.log(data);
        if ( data !== null ) {
            setSession(JSON.parse(data));
            window.localStorage.setItem('SESSION_DATA',JSON.stringify(session))
            setSession(JSON.parse(data));
            console.log(data);
        }
        else{
            console.log(data);
        }
      }, []);
      
    useEffect(() => {
        window.localStorage.setItem('SESSION_DATA',JSON.stringify(session))
      }, [session]);
    
      //
    const { secondsRemaining, setFreeze, resetTimer, isFrozen } =
    useTimer(initialTimer*60, true,
        () => {

            setTimerCompleted(true);
            setSession({...session,completed:session.completed + 1});
            var sound = new Howl({
                src: [sound_path]
            });
            sound.play()
            if (timerMode === "work-mode") {
                setTimerSession(timerSession + 1);
            }
        }
    );

    let timeObj = new Date(secondsRemaining * 1000);
    var minutes = timeObj.getUTCMinutes()
    var seconds = timeObj.getSeconds();

    const notify = (message) =>{
        toast(message);
    }

    const localStorageReset = (key) => {
        setSession({...session,completed:0});
    }

    const handleTimerState = () => {
        if(session.completed === session.total & session.total>0){
            notify("Sessions completed! ⏰");
        }
        else if(session.total === 0){
            notify("Set the number of sessions!!");
        }
        else{
            if (timerCompleted == false) {
                isFrozen ? setFreeze(false) : setFreeze(true);
            }
            else if (timerCompleted == true) {
                resetTimer(true);
                setTimerCompleted(false);
            }
        }
        
    }

   const stateObjects = {minutes,seconds,handleTimerState,resetTimer,isFrozen,setTimerMode,initialTimer,secondsRemaining,timerCompleted,setTimerCompleted,localStorageReset,editSession,setEditSession, session, setSession}
    return (
        <TimerContext.Provider value={stateObjects}>
            {children}
        </TimerContext.Provider>
    )
}
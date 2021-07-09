import React, {useState} from "react";
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, state = false) {
    if (!state) {
      setMode(newMode)
      setHistory((prev) => [...prev, newMode])
    } 
    if (state) {
      history.pop();
      setHistory(history);
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
    
  }
  const back = function(){
    if(history.length === 1) {
      setMode(history[0]);
    } else {
      // let historyLength = history.slice(0,history.length - 1);
      // setHistory([...historyLength]);
      // setMode(history[history.length - 2]);
      history.pop();
      setHistory(history);
      setMode(history.slice(-1)[0]);
    }
  }
  return {mode, transition, back};
}
import React, {useState} from "react";
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = function(newMode, state) {
    if (!state) {
      setHistory([...history, newMode])
    }
    setMode(newMode)
  }
  const back = function(){
    if(history.length === 1) {
      return;
    } else {
      let historyLength = history.slice(0,history.length - 1);
      setHistory([...historyLength]);
      setMode(history[history.length - 2]);
    }
  }
  return {mode, transition, back};
}
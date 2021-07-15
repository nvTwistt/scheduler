import {useState} from "react";
/**
 * function is another multi use function which takes care of the transitions as well as the
 * back function which allows users to undo what they were doing in the application.
 */
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
      history.pop(); //pop the first element off the stack
      setHistory(history); //set the history with the current stack
      setMode(history.slice(-1)[0]); //set the mode with the top element on the stack
    }
  }
  return {mode, transition, back};
}
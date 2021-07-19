import {useState} from "react";
/**
 * function is another multi use function which takes care of the transitions as well as the
 * back function which allows users to undo what they were doing in the application.
 */
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = function(newMode, recentError = false) {
    if (!recentError) {
      setMode(newMode)
      setHistory((prev) => [...prev, newMode])
    } 
    if (recentError) {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, prev.length -1), newMode]);
    }
    
  }
  const back = function(){
    if(history.length === 1) {
      return;
    } else {
      setHistory(prev => {
        const hist = [...prev.slice(0, prev.length -1)]; //pop the first element off the stack
        return hist;
      })
      setMode(history.slice(-2)[0]); //set the mode with the top element on the stack
    }
  }
  return {mode, transition, back};
}
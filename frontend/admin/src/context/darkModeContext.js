// darkModeContext.js
import { createContext, useReducer, useEffect } from "react";
import DarkModeReducer from "./darkModeReducer";

const getInitialDarkMode = (userId) => {
  const userDarkMode = localStorage.getItem(`userDarkMode_${userId}`);
  return userDarkMode === "true" || false;
};

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const userId = sessionStorage.getItem('userID');
  
  const getInitialMode = () => {
    const storedUserId = localStorage.getItem('currentUserId');
    return userId === storedUserId ? getInitialDarkMode(userId) : false;
  };

  const INITIAL_STATE = {
    darkMode: getInitialMode(),
  };

  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem(`userDarkMode_${userId}`, state.darkMode);
  }, [state.darkMode, userId]);

  const updateInitialMode = (newMode) => {
    dispatch({ type: 'SET_INITIAL_MODE', payload: newMode });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch, updateInitialMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// darkModeReducer.js
const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        darkMode: false,
      };
    }
    case "DARK": {
      return {
        darkMode: true,
      };
    }
    case "TOGGLE": {
      return {
        darkMode: !state.darkMode,
      };
    }
    case "SET_INITIAL_MODE": {
      return {
        darkMode: action.payload,
      };
    }
    default:
      return state;
  }
};

export default DarkModeReducer;

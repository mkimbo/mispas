import { useReducer, useContext, createContext, Dispatch } from "react";

type TState = {
  langCode: string;
};

const initialState: TState = {
  langCode: "en",
};

const reducer = (state: TState, action: any) => {
  switch (action.type) {
    case "SET_LANG_CODE":
      localStorage.setItem("mispas-language-code", action.payload);
      return { ...state, langCode: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext({} as Dispatch<any>);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useAppContext = () => useContext(GlobalStateContext);
export const useAppDispatch = () => useContext(GlobalDispatchContext);

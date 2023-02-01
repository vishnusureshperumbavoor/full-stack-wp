import { createContext,useReducer } from "react";
const Store = ({ children }) => {
  const [stateLogin, dispatchLogin] = useReducer(loginReducer,login);
};
export const Context = createContext({});
export default Store;

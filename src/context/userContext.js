import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  console.log(user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };

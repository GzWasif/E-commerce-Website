import { createContext, useContext, useState } from "react";

const LogInContext = createContext("cnaicbaic");

const useLogInContext = () => useContext(LogInContext);

const LogInContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  return (
    <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LogInContext.Provider>
  );
};

export { useLogInContext, LogInContextProvider };

// import { useNavigate } from "react-router-dom";
// import { useLogInContext } from "../../context/login";
import { useUserContext } from "../../context/userContext";

const Protected = ({ children }) => {
  // const navigate = useNavigate();
  // const { isLoggedIn } = useLogInContext();
  const user = useUserContext();

  if (!user) {
    // navigate("/", { replace: true });
  } else {
    return children;
  }
};

export default Protected;

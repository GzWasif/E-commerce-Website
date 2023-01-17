import { useNavigate } from "react-router-dom";
import { useLogInContext } from "../../context/login";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useLogInContext();

  if (!isLoggedIn) {
    // navigate("/", { replace: true });
  } else {
    return children;
  }
};

export default Protected;

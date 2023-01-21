import { useState, useEffect, useRef } from "react";
import { FormGroup, Input, Form, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
// import { useLogInContext } from "../../context/login";
// import useFetch from "../../Custom Hooks/useFetch";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword } from "../../firebase";

// const UserContext = createContext({});

// const useUserContext = () => useContext(UserContext);

const LogIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  // const { setIsLoggedIn } = useLogInContext();
  const [user, loading] = useAuthState(auth);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // const { data: users } = useFetch("http://localhost:8000/users");

  // console.log(users);
  // if (bhul) {
  //   navigate("*");
  // }

  useEffect(() => {
    inputRef.current.focus();
    if (loading) {
      console.log("Ami loading");
      return;
    }
    if (user) {
      console.log(user);
      navigate("/products");
    }
  }, [user, loading, navigate]);

  const handleLogIn = (e) => {
    e.preventDefault();
    // const demoUser = users.find((item) => item.email === email);
    // if (demoUser && demoUser.password === password) {
    //   setUser(demoUser);
    //   setError(false);
    //   setIsLoggedIn(true);
    //   navigate("/products");
    // } else {
    //   setError(true);
    //   setEmail("");
    //   setPassword("");
    // }
    logInWithEmailAndPassword(email, password)
      .then(() => {
        setError(false);
      })
      .catch((err) => {
        alert(err.message);
        setError(true);
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="formcontainer">
      <Form className="loginform border-0 opcity-0 w-40 ">
        <FormGroup>
          {/* <Label for="mail" className="d-block">
            <h4 className="labeltitle">Enter Email Address:</h4>
          </Label> */}
          <Input
            id="mail"
            type="email"
            placeholder="Email"
            bsSize="sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            innerRef={inputRef}
            className="rounded-pill opacity-75"

            // ref={inputRef}
          />
        </FormGroup>
        <FormGroup>
          {/* <Label for="password" className="d-block">
            <h4 className="labeltitle">Enter Password:</h4>
          </Label> */}
          <Input
            id="password"
            type="password"
            placeholder="Password"
            bsSize="sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-pill opacity-75"
          />
        </FormGroup>
        {error && <p>Incorrect Username or Password</p>}
        <Button
          color="secondary"
          outline
          onClick={handleLogIn}
          // className="d-block mx-auto"
          className="me-2"
        >
          LogIn
        </Button>
        <Button
          color="secondary"
          outline
          onClick={handleSignUp}
          // className="d-block mx-auto"
          className="me-2"
        >
          Signup
        </Button>
        {/* <Link to="/products">
          <p className="mt-2">Continue as a guest</p>
        </Link> */}
      </Form>
    </div>
  );
};

export default LogIn;

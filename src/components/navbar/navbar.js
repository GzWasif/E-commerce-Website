import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogInContext } from "../../context/login";
import { Input, InputGroup, Button } from "reactstrap";
import { Categorydropdown } from "../dropdown/dropdown";

const Navbar = ({ onSearch, cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { setIsLoggedIn } = useLogInContext();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const handleSubmit = () => {
    console.log(searchQuery);
    if (searchQuery.trim().length) {
      onSearch(searchQuery.trim());
    }
    setSearchQuery("");
  };

  const handleProfileClick = () => {
    navigate("/profile/:userId");
  };

  return (
    <div className="wrapper">
      <header className="container">
        <div className="header">
          <div className="grid">
            <Link to="/products" className="link">
              <h1 className="brand">E-commerce</h1>
            </Link>
            <div className="formContainer">
              {/* <form className="search"> */}
              {/* <Input
                value={searchQuery}
                onKeyDown={handleEnter}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
              />

              <button
                type="button"
                className="search-btn mt-2"
                onClick={() => handleSubmit()}
              >
                Search
              </button> */}
              {/* </form> */}
              <InputGroup>
                <Input
                  value={searchQuery}
                  onKeyDown={handleEnter}
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                  placeholder="Search products..."
                />
                <Button type="button" onClick={() => handleSubmit()}>
                  Search
                </Button>
              </InputGroup>
            </div>
            <Link to="/cart" className="link headerCart">
              <img className="cartImg" src="/cart.svg" alt="cart" />
              {cartItemCount > 0 && (
                <div className="cartCounter">
                  {cartItemCount <= 9 ? cartItemCount : "9+"}
                </div>
              )}
            </Link>
            <div>
              <Button onClick={handleProfileClick}>Profile</Button>
            </div>
            <div>
              <Button onClick={handleLogOut}>Log out</Button>
            </div>
            <div>
              <Categorydropdown direction={"down"} args={{ dark: "dark" }} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export { Navbar };

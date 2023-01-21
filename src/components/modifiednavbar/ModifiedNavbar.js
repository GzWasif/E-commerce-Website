import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useLogInContext } from "../../context/login";
import { Input, InputGroup, Button } from "reactstrap";
import { Categorydropdown } from "../dropdown/dropdown";
import { logout } from "../../firebase";

const ModifiedNavbar = ({ onSearch, cartItemCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // const { setIsLoggedIn } = useLogInContext();

  //   useEffect(() => {
  //     const navbar = document.getElementsByClassName(".navbar");
  //     console.log(navbar.classList);
  //     const sticky = navbar.offsetTop;
  //     if (window.scrollY >= sticky) {
  //       navbar.classList.add("sticky");
  //     } else {
  //       navbar.classList.remove("sticky");
  //     }
  //   }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // const handleLogOut = () => {
  //   setIsLoggedIn(false);
  //   navigate("/", { replace: true });
  // };

  const handleLogOut = async () => {
    const b = await logout();
    console.log(b);
    navigate("/");
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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        color="secondary"
        light
        expand="md"
        className="gird-container-nav"
        full
        // sticky="position:sticky"
      >
        <NavbarBrand href="/products" className="grid-item-nav">
          E-commerce
        </NavbarBrand>

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
        <InputGroup className="grid-item-nav">
          <Input
            value={searchQuery}
            onKeyDown={handleEnter}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            placeholder="Search products..."
            className="w-25"
          />
          <Button
            type="button"
            onClick={() => handleSubmit()}
            className="btn-light"
          >
            Search
          </Button>
        </InputGroup>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="grid-item-nav">
          <Nav navbar fill>
            <NavItem>
              <Link to="/cart" className="link headerCart ms-2">
                <img className="cartImg" src="/cart.svg" alt="cart" />
                {cartItemCount > 0 && (
                  <div className="cartCounter">
                    {cartItemCount <= 9 ? cartItemCount : "9+"}
                  </div>
                )}
              </Link>
            </NavItem>
            <NavItem>
              <Button onClick={handleProfileClick}>Profile</Button>
            </NavItem>
            <NavItem>
              <Button onClick={handleLogOut}>Log out</Button>
            </NavItem>
            <NavItem>
              <Categorydropdown direction={"down"} args={{ dark: "dark" }} />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export { ModifiedNavbar };

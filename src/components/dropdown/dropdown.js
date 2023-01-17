import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Categorydropdown({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleClick = (e) => {
    navigate(`/products/category/${e.target.innerHTML}`);
  };

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret>Shop By Category</DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem onClick={(e) => handleClick(e)}>
            men's clothing
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={(e) => handleClick(e)}>
            women's clothing
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={(e) => handleClick(e)}>jewelery</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={(e) => handleClick(e)}>
            electronics
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

Categorydropdown.propTypes = {
  direction: PropTypes.string,
};

export { Categorydropdown };

import "./index.css";
import styled from "styled-components";
import { createElement as $ } from "react";

import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const App = () => {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
};

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  const toOpen = () => {
    setOpen(!open);
  };

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={toOpen}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
};

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="animals"
          >
            Item3
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Items</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Items</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Items</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Items</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Items</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default App;

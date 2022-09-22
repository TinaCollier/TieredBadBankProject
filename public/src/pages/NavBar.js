import React, { useState } from 'react';
import icon from './images/palmtreeicon.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

function NavBar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" {...args} expand="md" >
        <NavbarBrand className="navbar-brand" href="#/">
        <img
        alt="Palm Tree Icon"
        src={ icon }
        style={{
          height: 40,
          width: 40
        }}
      />Bad Bank</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
                <NavLink href="#/" >Home</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="#/createaccount">Create Account</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret >
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem><NavLink href="#/deposit">Deposit</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/withdraw">Withdraw</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/transactions">Transactions</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/calculator">Calculator</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/news">News Search</NavLink></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
                <NavLink href="#/alldata">AllData</NavLink>
            </NavItem>
  
          </Nav>
          <NavbarText className="name">Tina Collier</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
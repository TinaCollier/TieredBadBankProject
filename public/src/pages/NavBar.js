import React, { useState, useContext } from 'react';
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
  NavbarText,
  Alert
} from 'reactstrap';
import UserContext from '../components/UserContext';
import { useNavigate } from "react-router-dom";

function NavBar( args ) {
  const [isOpen, setIsOpen] = useState( false) ;
  const toggle = () => setIsOpen( !isOpen );
  const { name, loggedIn, setId, setName, setEmail, setPassword, setTransactionHistory, setBalance, setLoggedIn } = useContext( UserContext );
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.clear();
    setId( 0 );
    setName( '' );
    setEmail( '' );
    setPassword( '' );
    setBalance( 0 );
    setTransactionHistory( [] );
    setLoggedIn( false );
    navigate( '/' );
  }

  return (
    <div>
      <Navbar className="navbar" { ...args } expand="md" >
        <NavbarBrand className="navbar-brand" href="#/">
        <img
        alt="Palm Tree Icon"
        src={ icon }
        style={{
          height: 40,
          width: 40
        }}
      />Bad Bank</NavbarBrand>
        <NavbarToggler onClick={ toggle } />
        <Collapse isOpen={ isOpen } navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
            <NavLink href="#/createaccount">Create Account</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="#/login">Login</NavLink>
            </NavItem>
            { !loggedIn ? <></> : 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret >
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem><NavLink href="#/deposit">Deposit</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/withdraw">Withdraw</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/transactions">Transactions</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/alldata">All Data</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/calculator">Calculator</NavLink></DropdownItem>
                <DropdownItem><NavLink href="#/news">News Search</NavLink></DropdownItem>
                <DropdownItem onClick={ handleLogout }>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          }
  
          </Nav>
          {name === '' ? 
          <NavbarText className="name">Create account or log in</NavbarText> : 
          <NavbarText className="name">Logged in as { name }</NavbarText>
          }
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
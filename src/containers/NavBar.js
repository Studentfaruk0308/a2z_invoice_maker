import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const link = {
  padding: '12px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
  font: '20px',
}

const NavBar = () => {
  return (
    <div className='NavBar'>
        <NavLink className="NavBarItem" to="/" style={link} activeStyle={{background: 'darkblue'}}>Home</NavLink>
        <NavLink className="NavBarItem" to="/Invoices" style={link} activeStyle={{background: 'darkblue'}}>INVOICE LIST</NavLink>
        <NavLink className="NavBarItem" to="/Clients" style={link} activeStyle={{background: 'darkblue'}}>CLIENTS</NavLink>
        <NavLink className="NavBarItem" to="/Users" style={link} activeStyle={{background: 'darkblue'}}>USERS</NavLink>
        <NavLink className="NavBarItem" to="/Profiles" style={link} activeStyle={{background: 'darkblue'}}>PROFILE SETUP</NavLink>
        <NavLink className="NavBarItem" to="/SignUp" style={link} activeStyle={{background: 'darkblue'}}>SIGN UP</NavLink>
        <NavLink className="NavBarItem" to="/LogOut" style={link} activeStyle={{background: 'darkblue'}}>LOGOUT</NavLink>
    </div> 
  );
};

export default NavBar;
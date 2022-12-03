import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const NavBar = () => {
  const { logout } = useAuth0();

  return (
    <div className='flex justify-center w-full bg-slate-300 flex items-center border-b-4'>
        <NavLink className="px-8 bg-slate-300 hover:bg-slate-200 h-16 py-5" to="/">HOME</NavLink>
        <NavLink className="px-8 bg-slate-300 hover:bg-slate-200 h-16 py-5" to="/invoices">INVOICES</NavLink>
        <NavLink className="px-8 bg-slate-300 hover:bg-slate-200 h-16 py-5" to="/clients">CLIENTS</NavLink>
        <NavLink className="px-8 bg-slate-300 hover:bg-slate-200 h-16 py-5" to="/profile">PROFILE</NavLink>
        <button className="px-8 bg-slate-300 hover:bg-slate-200 h-16 py-5" onClick={() => {
          logout()
        }}>LOGOUT</button>
    </div> 
  );
};

export default NavBar;
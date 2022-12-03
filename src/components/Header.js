import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  return (
    <div className='flex w-full bg-gray-500 justify-between flex-wrap'>
        <NavLink className="px-8 hover:bg-gray-200 h-12 py-3" to="/"><p className='font-semibold text-white text-xl'>Invoice Generator</p></NavLink>
        <div className='flex flex-wrap'>
            <NavLink className="px-8 hover:bg-gray-200 h-12 py-3" to="/"><p className='font-medium text-white'>Home</p></NavLink>
            <NavLink className="px-8 hover:bg-gray-200 h-12 py-3" to="/invoices"><p className='font-medium text-white'>Invoices</p></NavLink>
            <NavLink className="px-8 hover:bg-gray-200 h-12 py-3" to="/clients"><p className='font-medium text-white'>Clients</p></NavLink>
            <NavLink className="px-8 hover:bg-gray-200 h-12 py-3" to="/profile"><p className='font-medium text-white'>Profile</p></NavLink>
            <button className="px-8 hover:bg-gray-200 h-12 py-3" onClick={() => {
            logout()
            }}><p className='font-medium text-red-400'>Logout</p>
            </button>
        </div>
    </div>
  )
}

export default Header;
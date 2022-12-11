import React from 'react'
import { NavLink } from 'react-router-dom';
import {FaGithub} from 'react-icons/fa'

function Footer() {
  return (
    <div className='w-screen bg-gray-500 px-12 py-8'>

      <div className='flex justify-between mb-8'>
        <div>
          <p className='font-bold text-gray-200 mb-2'>Invoice Generator</p>
          <NavLink className="text-gray-200 text-xs mb-1" to="/">Home</NavLink>
        </div>

        <div>
          <p className='font-bold text-gray-200 text-xs mb-2'>Invoices</p>
          <p><NavLink className="text-gray-200 text-xs mb-1" to="/invoices">View Invoices</NavLink></p>
          <p><NavLink className="text-gray-200 text-xs mb-1" to="/invoices/create">Create Invoice</NavLink></p>
        </div>

        <div>
          <p className='font-bold text-gray-200 text-xs mb-2'>Clients</p>
          <p><NavLink className="text-gray-200 text-xs mb-1" to="/clients">View Clients</NavLink></p>
          <p><NavLink className="text-gray-200 text-xs mb-1" to="/clients/create">Create Client</NavLink></p>
        </div>

        <div>
          <p className='font-bold text-gray-200 text-xs mb-2'>Profile</p>
          <p><NavLink className="text-gray-200 text-xs mb-1" to="/profile">Edit Profile</NavLink></p>
        </div>

      </div>

        <div className='mb-2'>
          <p className='text-gray-200 text-xs text-justify'>This is a placeholder terms and conditions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor placerat finibus. Morbi sollicitudin semper urna vitae consequat. In leo magna, fermentum ac elementum eget, viverra et ipsum. Pellentesque sodales facilisis luctus. Integer urna est, malesuada ut sem at, ultricies mattis turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor placerat finibus. Morbi sollicitudin semper urna vitae consequat. In leo magna, fermentum ac elementum eget, viverra et ipsum. Pellentesque sodales facilisis luctus. Integer urna est, malesuada ut sem at, ultricies mattis turpis.</p>
        </div>

        <div className='flex justify-between'>
          <p className="mt-3 text-gray-200 text-xs"><a href="https://academyxi.com/">AcademyXi SE-PT-06 Phase-5 Final Project</a></p>
          <p className="mt-3 text-gray-200 text-xs"><a href="https://github.com/Studentfaruk0308"><FaGithub/>Md Faruk Ahmed 2022</a></p>
        </div>
    </div>
  )
}

export default Footer;
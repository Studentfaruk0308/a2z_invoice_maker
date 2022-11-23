import React from 'react'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

import { getClientsList } from '../api/ClientsApi'

export default function Clients() {
const navigate = useNavigate();
const [clientData, setClientData] = useState(null)
const [loading, setLoading] = useState(true);


  useEffect(() => {
      async function fetchClientData(){
          const data = await getClientsList()
          setClientData(data)
          setLoading(false)
      }
      fetchClientData()
  }, [])

  if (loading) {
    return <p>LOADING...</p>
  }
  

  if (clientData === null){
      return<div>
          <h1>
              NO CLIENT DATA AVAILABLE
          </h1>
      </div>
  }

  return (
    <div className="w-full bg-slate-300 pt-4">

    <div className='flex justify-between align-middle'>
        <h2 className="text-slate-800 text-3xl mb-6 font-semibold ml-6 text-center">List of all Clients</h2>
        <button className='bg-slate-500 rounded-xl text-m text-semibold text-white mx-4 px-4 active:bg-slate-700' onClick={() => navigate('/clients/create')}>Create</button>
    </div>
      <table>
        <thead>
            <tr className='h-12 border-b-4 border-b-slate-400'>
                <th className="w-64">CLIENT ID</th>                
                <th className="w-64">COMPANY NAME</th>
                <th className="w-64">NAME OF CONTACT PERSON</th>
                <th className="w-64">EMAIL</th>
                <th className="w-64">MOBILE NUMBER</th>
                <th className="w-64">PHONE NUMBER</th>
                <th className="w-64">POSTAL ADDRESS</th>
                <th className="w-64">OPTIONS</th>
            </tr>
        </thead>
        <tbody>
            {clientData.map(c => <tr className="odd:bg-white h-12 text-center" key={c.id}>
                <td className="w-64">{c.id}</td>                
                <td className="w-64">{c.company_name}</td>
                <td className="w-64">{c.contact_person_name}</td>
                <td className="w-64">{c.email}</td>
                <td className="w-64">{c.mobile_number}</td> 
                <td className="w-64">{c.phone_number}</td> 
                <td className="w-64">{c.postal_address}</td>
                <td className="w-42 flex p-4 content-center justify-center">
                    <button 
                    className="px-4 bg-slate-500 py-2 rounded-lg text-white active:bg-slate-700" 
                    onClick={() => navigate(`/clients/${c.id}/edit`)}>
                        Edit
                    </button>
                </td>          
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

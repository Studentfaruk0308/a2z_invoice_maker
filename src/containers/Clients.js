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
    return <div className='flex grow h-full justify-center content-center animate-pulse'><p className='text-center m-auto text-4xl'>Loading...</p></div>
  }
  

  if (clientData === null || (clientData?.length ?? 0) === 0) {
    return <div className='flex grow h-full justify-center content-center'><p className='text-center m-auto text-4xl'>No Clients.</p></div>
  }

  return (
    <div className="w-full bg-white pt-4">
        <div className='flex justify-between align-middle my-4'>
            <h2 className='text-2xl text-gray-800 font-semibold ml-8'>List of all Clients</h2>
            <button className='bg-gray-500 rounded text-m text-semibold text-white mx-8 px-8 active:bg-gray-700' onClick={() => navigate('/clients/create')}>Create</button>
        </div>
        <div className='overflow-x-auto mt-4'>
            <table className='min-w-[84rem] table-auto'>
                <thead>
                    <tr className='h-12 bg-gray-400'>
                        <th className="w-64 text-white">Client ID</th>                
                        <th className="w-64 text-white">Company Name</th>
                        <th className="w-64 text-white">Contact Person</th>
                        <th className="w-64 text-white">Email</th>
                        <th className="w-64 text-white">Mobile Number</th>
                        <th className="w-64 text-white">Phone Number</th>
                        <th className="w-64 text-white">Postal Address</th>
                        <th className="w-64 text-white">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {clientData.map(c => <tr className="even:bg-gray-200 h-12 text-center" key={c.id}>
                        <td className="w-64">{c.id}</td>                
                        <td className="w-64">{c.company_name}</td>
                        <td className="w-64">{c.contact_person_name}</td>
                        <td className="w-64">{c.email}</td>
                        <td className="w-64">{c.mobile_number}</td> 
                        <td className="w-64">{c.phone_number}</td> 
                        <td className="w-64">{c.postal_address}</td>
                        <td className="w-42 flex p-4 content-center justify-center">
                            <button 
                            className="px-4 bg-gray-500 py-2 rounded text-white active:bg-gray-700" 
                            onClick={() => navigate(`/clients/${c.id}/edit`)}>
                                Edit
                            </button>
                        </td>          
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

import React from 'react'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { getInvoiceList } from '../api/InvoicesApi'

export default function Invoices() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [Invoicedata, setInvoicedata] = useState(null)
  const { user } = useAuth0();

  useEffect(() => {
      async function fetchInvoiceData(){
          const data = await getInvoiceList(user.sub.slice(6))
          setInvoicedata(data)
          setLoading(false)
      }
          fetchInvoiceData()
  }, [])

  if (loading) {
    return <div className='flex grow h-full justify-center content-center animate-pulse'><p className='text-center m-auto text-4xl'>Loading...</p></div>
  }

  if (Invoicedata === null || (Invoicedata?.length ?? 0) === 0){
    return <div className='flex grow h-full justify-center content-center'><p className='text-center m-auto text-4xl'>No Invoices.</p></div>
  }

  return (
    <div className="w-full bg-white pt-4">

    <div className='flex justify-between align-middle my-4'>
        <h2 className="text-2xl text-gray-800 font-semibold ml-8">List of All Invoices</h2>
        <button className='bg-gray-500 rounded text-m text-semibold text-white mx-8 px-8 active:bg-gray-700' onClick={() => navigate('/invoices/create')}>Create</button>
    </div>
    <div className='overflow-x-auto'>
      <table className='min-w-[96rem]'>
        <thead>
            <tr className='h-12 bg-gray-400'>
                <th className="w-64 text-white">ID</th>                       
                <th className="w-64 text-white">Inv Number</th>
                <th className="w-64 text-white">Client ID</th>
                <th className="w-64 text-white">Date of Issue</th>
                <th className="w-64 text-white">Due Date</th>
                <th className="w-64 text-white">Reference</th>
                <th className="w-64 text-white">Description</th>
                <th className="w-64 text-white">Qtty</th>
                <th className="w-64 text-white">Unit Price</th>
                <th className="w-64 text-white">Sum</th>
                <th className="w-64 text-white">Tax</th>
                <th className="w-64 text-white">Total</th>
                <th className="w-64 text-white">Paid</th>
                <th className="w-64 text-white">Due</th>
                <th className="w-64 text-white">Options</th>
            </tr>
        </thead>
        <tbody>
            {Invoicedata.map(i => 
                <tr className="even:bg-gray-200 h-12 text-center" key={i.id}>
                    <td className="w-64">{i.id}</td>
                    <td className="w-64">{i.inv_number}</td>
                    <td className="w-64">{i.client_id}</td>
                    <td className="w-64">{(new Date(i.date_of_issue))?.toLocaleDateString('en-GB')}</td>
                    <td className="w-64">{(new Date(i.due_date))?.toLocaleDateString('en-GB')}</td> 
                    <td className="w-64">{i.job_reference}</td> 
                    <td className="w-64">{i.description}</td>                 
                    <td className="w-64">{i.quantity}</td> 
                    <td className="w-64">$ {i.unit_price.toFixed(2)}</td> 
                    <td className="w-64">$ {(i.quantity*i.unit_price).toFixed(2)}</td>
                    <td className="w-64">{i.tax} %</td>
                    <td className="w-64">$ {(i.quantity*i.unit_price + i.quantity*i.unit_price*(i.tax/100)).toFixed(2)}</td> 
                    <td className="w-64">$ {i.paid_amount.toFixed(2)}</td> 
                    <td className="w-64">
                        $ {(i.quantity*i.unit_price + i.quantity*i.unit_price*(i.tax/100) - i.paid_amount).toFixed(2)}
                        {(i.quantity*i.unit_price + i.quantity*i.unit_price*(i.tax/100) - i.paid_amount).toFixed(2) > 0 && <div className='h-2 w-2 bg-red-300 rounded-full relative bottom-4 left-24 animate-ping'/>}
                    </td> 
                    <td className="w-42 flex p-4 content-center justify-center">
                        <button className="px-4 bg-gray-500 py-2 rounded-l text-white active:bg-gray-700 border-r-2 border-gray-400" onClick={() => navigate(`/invoices/${i.id}`)}>View</button>
                        <button className="px-4 bg-gray-500 py-2 rounded-r text-white active:bg-gray-700" onClick={() => navigate(`/invoices/${i.id}/edit`)}>Edit</button>
                    </td>  
                </tr>
            )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

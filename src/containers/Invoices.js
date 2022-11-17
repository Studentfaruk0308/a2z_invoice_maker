import React from 'react'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { getInvoiceList } from '../api/InvoicesApi'

export default function Invoices() {
    const navigate = useNavigate();
    const [Invoicedata, setInvoicedata] = useState(null)
  const { user } = useAuth0();

  useEffect(() => {
      async function fetchInvoiceData(){
          const data = await getInvoiceList(user.sub.slice(6))
          setInvoicedata(data)
      }
          fetchInvoiceData()
  }, [])

  if (Invoicedata === null){
      return<div>
          <h1>
              NO INVOICE DATA AVAILABLE
          </h1>
      </div>
  }
  return (
    <div className="w-full bg-slate-300 pt-4">

    <div className='flex justify-between align-middle'>
        <h2 className="text-slate-800 text-3xl mb-6 font-semibold ml-6 text-center">List of All Invoices</h2>
        <button className='bg-slate-500 rounded-xl text-m text-semibold text-white mx-4 px-4 active:bg-slate-700' onClick={() => navigate('/invoices/create')}>Create</button>
    </div>

      <table>
        <thead>
            <tr className='h-12 border-b-4 border-b-slate-400'>
                <th className="w-64">INVOICE ID</th>
                <th className="w-64">PROFILE ID</th>                               
                <th className="w-64">INVOICE NUMBER</th>
                <th className="w-64">CLIENT ID</th>
                <th className="w-64">DATE OF ISSUE</th>
                <th className="w-64">DUE DATE</th>
                <th className="w-64">JOB REFERENCE</th>
                <th className="w-64">DESCRIPTION</th>
                <th className="w-64">QUANTITY</th>
                <th className="w-64">UNIT PRICE</th>
                <th className="w-64">SUM AMOUNT</th>
                <th className="w-64">TAX</th>
                <th className="w-64">TOTAL AMOUNT</th>
                <th className="w-64">PAID</th>
                <th className="w-64">DUE AMOUNT</th>
                <th className="w-64">VIEW</th>
            </tr>
        </thead>
        <tbody>
            {Invoicedata.map(i => 
                <tr className="odd:bg-white h-12 text-center" key={i.id}>
                    <td className="w-64">{i.id}</td>
                    <td className="w-64">{i.profile_id}</td>
                    <td className="w-64">{i.inv_number}</td>
                    <td className="w-64">{i.client_id}</td>
                    <td className="w-64">{(new Date(i.date_of_issue))?.toLocaleDateString('en-GB')}</td>
                    <td className="w-64">{(new Date(i.due_date))?.toLocaleDateString('en-GB')}</td> 
                    <td className="w-64">{i.job_reference}</td> 
                    <td className="w-64">{i.description}</td>                 
                    <td className="w-64">{i.quantity}</td> 
                    <td className="w-64">${i.unit_price.toFixed(2)}</td> 
                    <td className="w-64">${(i.quantity*i.unit_price).toFixed(2)}</td>
                    <td className="w-64">{i.tax}%</td>
                    <td className="w-64">${(i.quantity*i.unit_price + i.quantity*i.unit_price*(i.tax/100)).toFixed(2)}</td> 
                    <td className="w-64">${i.paid_amount.toFixed(2)}</td> 
                    <td className="w-64">${(i.quantity*i.unit_price + i.quantity*i.unit_price*(i.tax/100) - i.paid_amount).toFixed(2)}</td> 
                    <td className="w-64"><button className="px-4 bg-slate-500 py-2 rounded-xl m-4 text-white active:bg-slate-700" onClick={() => navigate(`/invoices/${i.id}`)}>View</button></td>  
                </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

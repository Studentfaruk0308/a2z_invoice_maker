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
    <div className="w-full  pt-4 grow">
        <div className='bg-slate-300 m-50 w-96 h-48 rounded-lg'> </div>

    </div>
  )
}

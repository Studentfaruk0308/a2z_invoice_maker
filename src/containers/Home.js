import React from 'react'
import { useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import { getInvoiceList } from '../api/InvoicesApi'

import PieChartPaid from '../components/charts/PieChartPaid';
import BarChartPaid from '../components/charts/BarChartPaid';
import BarChartRecent from '../components/charts/BarChartRecent';

export default function Invoices() {
  const [invoiceData, setInvoicedata] = useState(null)
  const [loading, setLoading] = useState(true)
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
    return <p>LOADING...</p>
  }

  return (
    <div className="align-w-full p-4 grow flex flex-wrap">
        <div className='bg-slate-300 m-50 w-96 h-96 rounded-lg p-4 m-4 pb-12'>
            <h3 className='font-semibold text-lg pb-4 text-center'>Status of Recent FIVE Invoices</h3>
            <BarChartRecent invoices={invoiceData}/>
        </div>

        <div className='bg-slate-300 m-50 w-96 h-96 rounded-lg p-4 m-4'>
            <h3 className='font-semibold text-lg text-center'>Number of Paid/Unpaid Invoices</h3>
            <PieChartPaid invoices={invoiceData}/>
        </div>

        <div className='bg-slate-300 m-50 w-96 h-96 rounded-lg p-4 m-4 pb-12'>
            <h3 className='font-semibold text-lg pb-4 text-center'>Funds Summary</h3>
            <BarChartPaid invoices={invoiceData}/>
        </div>
    </div>
  )
}

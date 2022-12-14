import React from 'react'
import { useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import { getInvoiceList } from '../api/InvoicesApi'

import PieChartPaid from '../components/charts/PieChartPaid';
import BarChartSummary from '../components/charts/BarChartSummary';
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
    return <div className='flex grow h-full justify-center content-center animate-pulse'><p className='text-center m-auto text-4xl'>Loading...</p></div>
  }

  return (
    <div className=''>
      <h2 className='text-2xl text-gray-800 font-semibold h-50 pt-8 pl-8'>Home</h2>
      <div className="align-w-full grow flex flex-wrap p-4">
          <div className='bg-gray-200 w-[32rem] h-96 rounded p-4 m-4 pb-12'>
              <h3 className='font-semibold text-lg pb-4 text-center'>Status of Recent FIVE Invoices</h3>
              <BarChartRecent invoices={invoiceData}/>
          </div>

          <div className='bg-gray-200 m-50 w-[32rem] h-96 rounded p-4 m-4'>
              <h3 className='font-semibold text-lg text-center'>Number of Paid/Unpaid Invoices</h3>
              <PieChartPaid invoices={invoiceData}/>
          </div>

          <div className='bg-gray-200 m-50 w-[32rem] h-96 rounded p-4 m-4 pb-12'>
              <h3 className='font-semibold text-lg pb-4 text-center'>Funds Summary</h3>
              <BarChartSummary invoices={invoiceData}/>
          </div>
      </div>
    </div>
  )
}

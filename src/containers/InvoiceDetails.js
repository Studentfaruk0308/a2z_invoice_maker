import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { getInvoice } from '../api/InvoicesApi'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function InvoiceDetails(props) {
  const [invoiceData, setInvoiceData] = useState()
  const [loading, setLoading] = useState(true)
  const {invoiceid} = useParams();
  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInvoice(invoiceid);
      setInvoiceData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const printInvoice = useReactToPrint({
    content: () => componentRef.current,
    });
    

  const sendInvoice = () => {
    window.open('mailto:email@example.com?subject=Subject&body=Body%20goes%20here')
  }


  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <div className="mx-auto bg-slate-300 pl-12 pr-56 py-12 rounded-lg my-4">
    <h2 className="text-slate-800 text-3xl mb-6 font-semibold">Invoice {invoiceData.inv_number}</h2>

                <p className='font-bold border-red-300'>CLIENT ID</p>
                <p className='text-center'>{invoiceData.client_id}</p>

                <p className="p-2">DATE OF ISSUE</p>
                <p>{(new Date(invoiceData.date_of_issue))?.toLocaleDateString()}</p>

                <p>DUE DATE</p>
                <p>{(new Date(invoiceData.due_date))?.toLocaleDateString()}</p> 

                <p>JOB REFERENCE</p>
                <p>{invoiceData.job_reference}</p> 

                <p>DESCRIPTION</p>
                <p>{invoiceData.description}</p>

                <p>QUANTITY</p>           
                <p>{invoiceData.quantity}</p> 

                <p>UNIT PRICE</p>   
                <p>{invoiceData.unit_price}</p> 

                <p>TAX</p>
                <p>{invoiceData.tax}</p> 

                <p>AMOUNT</p>
                <p>{invoiceData.amount}</p> 

                <p>TOTAL AMOUNT</p>
                <p>{invoiceData.total_amount}</p> 

                <p>PAID</p>
                <p>{invoiceData.paid}</p> 

                <p>DUE AMOUNT</p>
                <p>{invoiceData.due_amount}</p> 


                <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-slate-700 mr-4" onClick={printInvoice}>Print Invoice</button>
                <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-slate-700" onClick={sendInvoice}>Send Invoice</button>
    </div>
  )
}
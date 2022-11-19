import React, { useEffect, useState } from 'react'

import { getInvoice } from '../api/InvoicesApi'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate} from 'react-router-dom';

export default function InvoiceDetails(props) {
  const [invoiceData, setInvoiceData] = useState();
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const {invoiceid} = useParams();
  const printingRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInvoice(invoiceid);
      console.warn(data)
      setInvoiceData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const printInvoice = useReactToPrint({
    content: () => printingRef.current,
  });

  const sendInvoice = async () => {
  }


  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <div className="mx-auto bg-slate-300 mb-4 w-screen">
      <div ref={printingRef} className="px-12 py-12 flex flex-col min-h-screen">
          <div className='flex flex-col'>
                {/* header details */}
                <div className='flex justify-between flex-wrap'>
                  {/* title */}
                  <div className='w-96 min-w-96 mb-4'>
                    <h1 className="text-2xl font-semibold mb-4">Tax Invoice</h1>
                    <p>{invoiceData.client_details.company_name}</p>
                    <p>{invoiceData.client_details.postal_address}</p>
                  </div>

                  {/* profile/client details */}
                  <div className='flex justify-between w-64'>
                    {/* client details */}
                    <div>
                      <p className='font-semibold'>Invoice Number</p>
                      <p>{invoiceData.inv_number}</p>

                      <p className='font-semibold mt-4'>Invoice Date</p>
                      <p>{(new Date(invoiceData.date_of_issue))?.toLocaleDateString('en-GB')}</p>

                      <p className='font-semibold mt-4'>Due Date</p>
                      <p>{(new Date(invoiceData.due_date))?.toLocaleDateString('en-GB')}</p>

                      <p className='font-semibold mt-4'>Reference</p>
                      <p>{invoiceData.job_reference}</p>
                    </div>

                    {/* profile details */}
                    <div>
                      <p>{invoiceData.profile_details.company_name}</p>
                      <p>{invoiceData.profile_details.address}</p>
                    </div>
                  </div>
                </div>

                {/* calculation */}
                <div className=' bg-slate-200 rounded-lg pt-4 my-12'>

                <div className='flex justify-between px-4'>
                    <p className='font-bold mr-4 text-xl'>Item</p>
                    <p className='font-bold text-xl'>Amount</p>
                  </div>

                  <div className='h-px w-auto bg-gray-800 mt-4'/>
              <div>

                  <div className='flex justify-between px-4 py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Description</p>
                    <p>{invoiceData.description}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Quantity</p>
                    <p>{invoiceData.quantity}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Unit Price</p>
                    <p>${invoiceData.unit_price.toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4  py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Sum Amount</p>
                    <p>${(invoiceData.quantity*invoiceData.unit_price).toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Tax</p>
                    <p>{invoiceData.tax}%</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Total Amount</p>
                    <p>${(invoiceData.quantity*invoiceData.unit_price + invoiceData.quantity*invoiceData.unit_price*(invoiceData.tax/100)).toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Paid Amount</p>
                    <p>${invoiceData.paid_amount.toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1  odd:bg-slate-100'>
                    <p className='font-semibold mb-2 mr-4'>Due Amount</p>
                    <p>${(invoiceData.quantity*invoiceData.unit_price + invoiceData.quantity*invoiceData.unit_price*(invoiceData.tax/100) - invoiceData.paid_amount).toFixed(2)}</p>
                  </div>
                </div>
                </div>

                {/* full profile bank details */}
                <div>
                  <p className='text-lg font-semibold'>Due Date: {(new Date(invoiceData.due_date))?.toLocaleDateString('en-GB')}</p>
                  <p className='text-sm'>Bank Details: {invoiceData.profile_details.bank_details}</p>
                </div>

                {/* terms and conditions */}
                <p className='text-sm my-4'>All business undertaken by {invoiceData.profile_details.company_name} and all services provided by {invoiceData.profile_details.company_name} are undertaken pursuant to our "Terms and Conditions" which are avail able on our website. If you cannot access our website please do not nesitate in requesting a copy.</p>
          </div>

              {/* profile address, footer content */}
              <div className='flex flex-col grow justify-end'>
                <p></p>
                <p className='text-sm'>ABN: {invoiceData.profile_details.abn}. Registered Office: {invoiceData.profile_details.address}</p>
              </div>
          </div>

          

              <div className='mb-12 mx-12'>
              <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-slate-700 mr-4" onClick={() => navigate(`/invoices/${invoiceData.id}/edit`)}>Edit</button>
              <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-slate-700 mr-4" onClick={printInvoice}>Print Invoice</button>
                <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-slate-700" onClick={sendInvoice}>Send Invoice</button>
              </div>

    </div>
  )
}
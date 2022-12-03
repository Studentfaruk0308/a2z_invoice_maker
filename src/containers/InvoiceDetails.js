import React, { useEffect, useState } from 'react'

import { getInvoice, updateInvoice } from '../api/InvoicesApi'
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
      setInvoiceData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const printInvoice = useReactToPrint({
    content: () => printingRef.current,
  });

  const sendInvoice = async () => {
    setLoading(true)
    const {created_at, updated_at, ...data} = invoiceData
    await updateInvoice(invoiceid, data);
    alert("Email Sent!")
    setLoading(false)
  }


  if (loading) {
    return <div className='flex grow h-full justify-center content-center animate-pulse'><p className='text-center m-auto text-4xl'>Loading...</p></div>
  }

  return (
    <div className="mx-auto bg-gray-300 mb-4 w-screen">
      <div ref={printingRef} className="px-12 py-12 flex flex-col min-h-screen">
          <div className='flex flex-col'>
                {/* header details */}
                <div className='flex justify-between flex-wrap'>
                  {/* title */}
                  <div className='w-96 min-w-96 mb-4'>
                    <h1 className="text-4xl font-semibold mb-4">Tax Invoice</h1>
                    <p>{invoiceData.client_details.company_name}</p>
                    <p>{invoiceData.client_details.postal_address}</p>
                  </div>
                  <div>
                      <p className='text-2xl flex justify-between w-64'>{invoiceData.profile_details.company_name}</p>
                      <p className='text-m flex justify-between w-64'>{invoiceData.profile_details.address}</p>
                  </div>
                </div>

                <div className='flex bg-gray-200 rounded-lg px-4 my-8'>
                  <div class='flex-auto'>
                      <p className='font-semibold'>Invoice Number: </p>
                      <p>{invoiceData.inv_number}</p>
                  </div>
                  <div class='flex-auto'>
                      <p className='font-semibold'>Reference:</p>
                      <p>{invoiceData.job_reference}</p>
                  </div>
                  <div class='flex-auto'>
                      <p className='font-semibold'>Date of Issue:</p>
                      <p>{(new Date(invoiceData.date_of_issue))?.toLocaleDateString('en-GB')}</p>
                  </div>
                  <div class='flex-auto'>
                      <p className='font-semibold'>Due Date:</p>
                      <p>{(new Date(invoiceData.due_date))?.toLocaleDateString('en-GB')}</p>
                  </div>
                </div>

                {/* calculation */}
                <div className=' bg-gray-200 rounded-lg pt-4 mb-8'>

                  <div className='flex justify-between px-4'>
                    <p className='font-bold mr-4 text-xl'>Item</p>
                    <p className='font-bold text-xl'>Amount</p>
                  </div>

                  <div className='h-px w-auto bg-gray-800 mt-4'/>
              <div>

                  <div className='flex justify-between px-4 py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Description</p>
                    <p>{invoiceData.description}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Quantity</p>
                    <p>{invoiceData.quantity}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Unit Price</p>
                    <p>$ {invoiceData.unit_price.toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4  py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Sum Amount</p>
                    <p>$ {(invoiceData.quantity*invoiceData.unit_price).toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Tax</p>
                    <p>{invoiceData.tax} %</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Total Amount</p>
                    <p>$ {(invoiceData.quantity*invoiceData.unit_price + invoiceData.quantity*invoiceData.unit_price*(invoiceData.tax/100)).toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1 odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Paid Amount</p>
                    <p>$ {invoiceData.paid_amount.toFixed(2)}</p>
                  </div>

                  <div className='flex justify-between px-4 py-1  odd:bg-gray-100'>
                    <p className='font-semibold mb-2 mr-4'>Due Amount</p>
                    <p>$ {(invoiceData.quantity*invoiceData.unit_price + invoiceData.quantity*invoiceData.unit_price*(invoiceData.tax/100) - invoiceData.paid_amount).toFixed(2)}</p>
                  </div>
                </div>
                </div>

                {/* full profile bank details */}
                <div>
                  <p className='text-lg font-semibold'>Due Date: {(new Date(invoiceData.due_date))?.toLocaleDateString('en-GB')}</p>
                  <p className='text-m font-semibold'>Payment by Electronic Transfer to:</p>
                  <p className='text-sm'>Account Name: {invoiceData.profile_details.company_name}</p>
                  <p className='text-sm'>Bank Details: {invoiceData.profile_details.bank_details}</p>
                </div>

                {/* terms and conditions */}
                <p className='text-m my-8 font-bold'>All business undertaken by "{invoiceData.profile_details.company_name}" and all services provided by "{invoiceData.profile_details.company_name}" are undertaken pursuant to our "Terms and Conditions" which are available on our website. If you cannot access our website please do not hesitate in requesting a copy.</p>
          </div>

              {/* profile address, footer content */}
              <div className='flex flex-col grow justify-end bg-white rounded-lg'>
                <p className='text-l text-center font-semibold'>ABN: {invoiceData.profile_details.abn}. Registered Office: {invoiceData.profile_details.address}</p>
              </div>
          </div>

          

              <div className='mb-12 mx-12'>
              <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-gray-700 mr-4" onClick={() => navigate(`/invoices/${invoiceData.id}/edit`)}>Edit</button>
              <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-gray-700 mr-4" onClick={() => navigate(`/invoices/create`, { state: {invoice: invoiceData}})}>Copy</button>
              <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-gray-700 mr-4" onClick={printInvoice}>Print Invoice</button>
                <button className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-gray-700" onClick={sendInvoice}>Send Invoice</button>
              </div>

    </div>
  )
}
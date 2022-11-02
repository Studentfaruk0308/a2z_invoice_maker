import React from 'react'
import { useState, useEffect} from 'react'
import { getInvoiceList } from '../api/InvoicesApi'
import w3css from "w3-css"

export default function Invoices() {

  const [Invoicedata, setInvoicedata] = useState([{"id":1,"inv_number":"INV-001","client_id":1,"date_of_issue":"2022-10-25T00:00:00.000Z","due_date":"2022-11-25T00:00:00.000Z","job_reference":"First Job","description":"Testing Job","quantity":1,"unit_price":250,"tax":25,"amount":250,"total_amount":275,"paid":null,"due_amount":null,"created_at":"2022-10-25T03:27:23.552Z","updated_at":"2022-10-25T03:27:23.552Z"}])

  useEffect(() => {
      async function fetchInvoiceData(){
          const data = await getInvoiceList()
          console.log(data)
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
    <div>
      <h1>LIST OF ALL INVOICES</h1>
      <table className="w3-table w3-hoverable w3-border w3-bordered w3-striped w3-centered">
        <thead>
            <tr className='w3-red w3-bordered-black w3-border-black'>
                <th>INVOICE NUMBER</th>
                <th>CLIENT ID</th>
                <th>DATE OF ISSUE</th>
                <th>DUE DATE</th>
                <th>JOB REFERENCE</th>
                <th>DESCRIPTION</th>
                <th>QUANTITY</th>
                <th>UNIT PRICE</th>
                <th>TAX</th>
                <th>AMOUNT</th>
                <th>TOTAL AMOUNT</th>
                <th>PAID</th>
                <th>DUE AMOUNT</th>
                <th>VIEW</th>
            </tr>
        </thead>
        <tbody>
            {Invoicedata.map(i => <tr key={i.id}>
                <td>{i.inv_number}</td>
                <td>{i.client_id}</td>
                <td>{i.date_of_issue}</td>
                <td>{i.due_date}</td> 
                <td>{i.job_reference}</td> 
                <td>{i.description}</td>                 
                <td>{i.quantity}</td> 
                <td>{i.unit_price}</td> 
                <td>{i.tax}</td> 
                <td>{i.amount}</td> 
                <td>{i.total_amount}</td> 
                <td>{i.paid}</td> 
                <td>{i.due_amount}</td> 
                <td>View</td>  
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

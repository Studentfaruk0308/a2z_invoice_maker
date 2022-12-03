import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { createInvoice } from '../api/InvoicesApi'
import { getClientsList } from '../api/ClientsApi'

export default function InvoiceCreate(props) {
  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const [clientData, setClientData] = useState(null)
  const [loading, setLoading] = useState(true);

  // only copy values once incase overwrite
  const {state = {}} = useLocation();
  const [copiedValues, setCopiedValues] = useState(false)

  const { invoice } = state ?? {};

  useEffect(() => {
    async function fetchClientData(){
        const data = await getClientsList()
        setClientData(data)
        setLoading(false)
    }
    fetchClientData()
  }, [])

  useEffect(() => {
    if (invoice && !copiedValues) {
      setValue('client_id', invoice?.client_id)
      setValue('inv_number', invoice?.inv_number)
      setValue('date_of_issue', invoice?.date_of_issue)
      setValue('due_date', invoice?.due_date)
      setValue('job_reference', invoice?.job_reference)
      setValue('description', invoice?.description)
      setValue('quantity', invoice?.quantity)
      setValue('unit_price', invoice?.unit_price)
      setValue('tax', invoice?.tax)
      setValue('paid_amount', invoice?.paid_amount)
      
      setCopiedValues(true)
    }
  }, [invoice])

  const unit_price = watch('unit_price') ?? 0;
  const quantity = watch('quantity') ?? 1;
  const tax = watch('tax') ?? 10
  const paid_amount = watch('paid_amount') ?? 0
  const sum_amount = unit_price * quantity
  const total_amount = sum_amount + sum_amount * (tax/100)
  const due_amount = total_amount - paid_amount

  const onSubmit = data => {
    const response = createInvoice({...data, profile_id: user.sub.slice(6)});

    if (response.error) {
      alert(response.error)
    } else {
      navigate('/invoices')
    }
  }

  if (loading) {
    return <p>LOADING...</p>
  }

  const inputContainerStyle = 'mb-8'
  const inputHeaderStyle = 'mb-1 text-gray-800 font-semibold'
  const inputStyle = 'focus:border-1 rounded border-gray-200 border-2 px-3 py-2 text-gray-800 w-96'
  const errorInputStyle = 'border-2 border-red-600'
  const errorStyle = 'text-red-600 text-sm mt-1 font-bold'

  return (
    <div className="m-12">
    <h2 className="text-gray-800 text-3xl mb-6 font-semibold">Create invoice</h2>   

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>CLIENT</p>
        <select 
          id="client_id" 
          name="client_id" 
          className={`${errors.client_id && errorInputStyle} ${inputStyle}`} 
          placeholder="Client ID" 
          {...register("client_id", {required: "Client ID is required"})}>
          {clientData.map(c => (
            <option value={c.id}>{c.company_name}</option>
          ))}
        </select>
        {errors.client_id && <p className={`${errorStyle}`} role="alert">{errors.client_id?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Invoice Number</p>
        <input className={`${errors.inv_number && errorInputStyle} ${inputStyle}`} type="text" placeholder="Invoice Number" {...register("inv_number", {required: "Invoice Number is required"})}  />
        {errors.inv_number && <p className={`${errorStyle}`} role="alert">{errors.inv_number?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Date of Issue</p>
        <input className={`${errors.date_of_issue && errorInputStyle} ${inputStyle}`} type="date" placeholder="Date of Issue" {...register("date_of_issue", {required: "Date of Issue is required", valueAsDate: true})}  />
        {errors.date_of_issue && <p className={`${errorStyle}`} role="alert">{errors.date_of_issue?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Due Date</p>
        <input className={`${errors.due_date && errorInputStyle} ${inputStyle}`} type="date" placeholder="Due Date" {...register("due_date", {required: "Due Date is required", valueAsDate: true})}  />
        {errors.due_date && <p className={`${errorStyle}`} role="alert">{errors.due_date?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Job Reference</p>
        <input className={`${errors.job_reference && errorInputStyle} ${inputStyle}`} type="text" placeholder="Job Reference" {...register("job_reference", {required: "Job Reference is required"})}  />
        {errors.job_reference && <p className={`${errorStyle}`} role="alert">{errors.job_reference?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Description</p>
        <input className={`${errors.description && errorInputStyle} ${inputStyle}`} type="text" placeholder="Job Description" {...register("description", {required: "Job Description is required"})}  />
        {errors.description && <p className={`${errorStyle}`} role="alert">{errors.description?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Quantity</p>
        <input className={`${errors.quantity && errorInputStyle} ${inputStyle}`} type="number" placeholder="Quantity" {...register("quantity", {required: "Quantity is required", valueAsNumber: true, min: {value: 0, message: "Must not be negative"}})}  />
        {errors.quantity && <p className={`${errorStyle}`} role="alert">{errors.quantity?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Unit Price</p>
        <input className={`${errors.unit_price && errorInputStyle} ${inputStyle}`} type="number" step=".01" placeholder="Unit Price" {...register("unit_price", {required: "Unit Price is required", valueAsNumber: true, min: {value: 0, message: "Must not be negative"}})}  />
        {errors.unit_price && <p className={`${errorStyle}`} role="alert">{errors.unit_price?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Sum Amount</p>
        <p>${sum_amount || "0"}</p>
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Tax Amount</p>
        <input className={`${errors.tax && errorInputStyle} ${inputStyle}`} type="number" step=".01" placeholder="Tax" {...register("tax", {required: "Tax Amount is required", valueAsNumber: true, min: {value: 0, message: "Must not be negative"}})}  />
        {errors.tax && <p className={`${errorStyle}`} role="alert">{errors.tax?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Total Amount</p>
        <p>${total_amount || "0"}</p>
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Paid Amount</p>
        <input className={`${errors.paid_amount && errorInputStyle} ${inputStyle}`} type="number" step=".01" placeholder="Paid Amount" {...register("paid_amount", {required: "Paid Amount is required", valueAsNumber: true, min: {value: 0, message: "Must not be negative"}})}  />
        {errors.paid_amount && <p className={`${errorStyle}`} role="alert">{errors.paid_amount?.message}</p>}
      </div>
      
      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Due Amount</p>
        <p>${due_amount || "0"}</p>
      </div>

      <input type="submit" className="bg-gray-500 rounded px-4 py-2 mt-4 text-white active:bg-gray-700 mb-4" />
    </form>
    <p className="text-rose-600">Clicking Submit will email the invoice to Client</p>
    </div>
  )
}
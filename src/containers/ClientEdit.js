import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate} from 'react-router-dom';

import { getClient, updateClient } from '../api/ClientsApi'

export default function ClientEdit(props) {
  const [clientData, setClientData] = useState();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const {clientid} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getClient(clientid);
      setClientData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const onSubmit = data => {
    const response = updateClient(clientid, data);

    if (response.error) {
      alert(response.error)
    } else {
      navigate('/clients')
    }
  }

  if (loading) {
    return <p>LOADING...</p>
  }

  const inputContainerStyle = 'mb-4'
  const inputHeaderStyle = 'mb-1 text-slate-800 font-medium'
  const inputStyle = 'focus:border-1 rounded-lg border-1 px-4 py-2'
  const errorInputStyle = 'border-2 border-red-600'
  const errorStyle = 'text-red-600 text-sm mt-1 font-bold'

  return (
    <div className="mx-auto bg-slate-300 pl-12 pr-56 py-12 rounded-lg my-4">
    <h2 className="text-slate-800 text-3xl mb-6 font-semibold">Edit client #{clientid}</h2>   

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Name of Company</p>
        <input 
          className={`${errors.company_name && errorInputStyle} ${inputStyle}`} 
          type="text"
          placeholder="Company Name"
          defaultValue={clientData?.company_name ?? ""}
          {...register("company_name", {required: "Company Name is required"})}  
         />
        {errors.company_name && <p className={`${errorStyle}`} role="alert">{errors.company_name?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Name of Contact Person</p>
        <input 
          className={`${errors.contact_person_name && errorInputStyle} ${inputStyle}`} 
          type="text" 
          placeholder="Contact Person Name"
          defaultValue={clientData?.contact_person_name ?? ""}
          {...register("contact_person_name", {required: "Name of Contact Person is required"})}  />
        {errors.contact_person_name && <p className={`${errorStyle}`} role="alert">{errors.contact_person_name?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Email</p>
        <input 
          className={`${errors.email && errorInputStyle} ${inputStyle}`} 
          type="text" 
          placeholder="Email"
          defaultValue={clientData?.email ?? ""}
          {...register("email", {required: "Email is required", pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}  />
        {errors.email && <p className={`${errorStyle}`} role="alert">{errors.email?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Mobile Number</p>
        <input 
          className={`${errors.mobile_number && errorInputStyle} ${inputStyle}`}
          type="number" 
          placeholder="Mobile Number"
          defaultValue={clientData?.mobile_number ?? ""}
          {...register("mobile_number", {required: "Mobile Number is required"})}  />
        {errors.mobile_number && <p className={`${errorStyle}`} role="alert">{errors.mobile_number?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Phone Number</p>
        <input 
          className={`${errors.phone_number && errorInputStyle} ${inputStyle}`} 
          type="number" 
          placeholder="Phone Number"
          defaultValue={clientData?.phone_number ?? ""}
          {...register("phone_number", {required: "Phone Number is required"})}  />
        {errors.phone_number && <p className={`${errorStyle}`} role="alert">{errors.phone_number?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Postal Address</p>
        <input 
          className={`${errors.postal_address && errorInputStyle} ${inputStyle}`} 
          type="text" 
          placeholder="Postal Address"
          defaultValue={clientData?.postal_address ?? ""}
          {...register("postal_address", {required: "Postal Address is required"})}  />
        {errors.postal_address && <p className={`${errorStyle}`} role="alert">{errors.postal_address?.message}</p>}
      </div>

      <input type="submit" className="bg-white rounded-xl px-4 py-2 mt-4 active:bg-slate-700" />
    </form>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import { createClient } from '../api/ClientsApi'

export default function ClientCreate(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data)
    const response = createClient(data);

    if (response.error) {
      alert(response.error)
    } else {
      navigate('/clients')
    }
  }

  const inputContainerStyle = 'mb-8'
  const inputHeaderStyle = 'mb-1 text-gray-800 font-semibold'
  const inputStyle = 'focus:border-1 rounded border-gray-200 border-2 px-3 py-2 text-gray-800 w-96'
  const errorInputStyle = 'border-2 border-red-600'
  const errorStyle = 'text-red-600 text-sm mt-1 font-bold'

  return (
    <div className="m-12">
    <h2 className="text-gray-800 text-3xl mb-6 font-semibold">Create client</h2>   

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Name of Company</p>
        <input className={`${errors.company_name && errorInputStyle} ${inputStyle}`} type="text" placeholder="Company Name" {...register("company_name", {required: "Company Name is required"})}  />
        {errors.company_name && <p className={`${errorStyle}`} role="alert">{errors.company_name?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Name of Contact Person</p>
        <input className={`${errors.contact_person_name && errorInputStyle} ${inputStyle}`} type="text" placeholder="Contact Person Name" {...register("contact_person_name", {required: "Name of Contact Person is required"})}  />
        {errors.contact_person_name && <p className={`${errorStyle}`} role="alert">{errors.contact_person_name?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Email</p>
        <input className={`${errors.email && errorInputStyle} ${inputStyle}`} type="text" placeholder="Email" {...register("email", {required: "Email is required", pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}  />
        {errors.email && <p className={`${errorStyle}`} role="alert">{errors.email?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Mobile Number</p>
        <input className={`${errors.mobile_number && errorInputStyle} ${inputStyle}`} type="number" placeholder="Mobile Number" {...register("mobile_number", {required: "Mobile Number is required"})}  />
        {errors.mobile_number && <p className={`${errorStyle}`} role="alert">{errors.mobile_number?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Phone Number</p>
        <input className={`${errors.phone_number && errorInputStyle} ${inputStyle}`} type="number" placeholder="Phone Number" {...register("phone_number", {required: "Phone Number is required"})}  />
        {errors.phone_number && <p className={`${errorStyle}`} role="alert">{errors.phone_number?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Postal Address</p>
        <input className={`${errors.postal_address && errorInputStyle} ${inputStyle}`} type="text" placeholder="Postal Address" {...register("postal_address", {required: "Postal Address is required"})}  />
        {errors.postal_address && <p className={`${errorStyle}`} role="alert">{errors.postal_address?.message}</p>}
      </div>

      <input type="submit" className="bg-gray-500 rounded px-4 py-2 mt-4 text-white active:bg-gray-700" />
    </form>
    </div>
  )
}
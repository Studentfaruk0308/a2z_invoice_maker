import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


import { getProfile, createProfile, updateProfile } from '../api/ProfilesApi'

export default function ProfileEdit(props) {
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfile(user.sub.slice(6));
      setProfileData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const onSubmit = data => {
    let response;
    console.warn("TEST", profileData)
    if (!profileData) {
      response = createProfile({...data, id: user.sub.slice(6)});
    } else {
      response = updateProfile(user.sub.slice(6), data);
    }

    if (response.error) {
      alert(response.error)
    } else {
      navigate('/invoices')
    }
  }

  if (loading) {
    return <div className='flex grow h-full justify-center content-center animate-pulse'><p className='text-center m-auto text-4xl'>Loading...</p></div>
  }

  const inputContainerStyle = 'mb-8'
  const inputHeaderStyle = 'mb-1 text-gray-800 font-semibold'
  const inputStyle = 'focus:border-1 rounded border-gray-200 border-2 px-3 py-2 text-gray-800 w-96'
  const errorInputStyle = 'border-2 border-red-600'
  const errorStyle = 'text-red-600 text-sm mt-1 font-bold'

  return (
    <div className="m-12">
    <h2 className="text-gray-800 text-3xl mb-12 font-semibold">Profile</h2>   

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle} text-gray-800`}>Profile Name</p>
        <input className={`${errors.profile_name && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.profile_name ?? ""} {...register("profile_name", {required: "Profile Name is required"})}  />
        {errors.profile_name && <p className={`${errorStyle}`} role="alert">{errors.profile_name?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Company Name</p>
        <input className={`${errors.company_name && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.company_name ?? ""} {...register("company_name", {required: "Company Name is required"})}  />
        {errors.company_name && <p className={`${errorStyle}`} role="alert">{errors.company_name?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Address</p>
        <input className={`${errors.address && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.address ?? ""} {...register("address", {required: "address is required"})}  />
        {errors.address && <p className={`${errorStyle}`} role="alert">{errors.address?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>ABN</p>
        <input className={`${errors.abn && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.abn ?? ""} {...register("abn", {required: "ABN is required"})}  />
        {errors.abn && <p className={`${errorStyle}`} role="alert">{errors.abn?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Email</p>
        <input className={`${errors.email && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.email ?? ""} {...register("email", {required: "Email is required", pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}  />
        {errors.email && <p className={`${errorStyle}`} role="alert">{errors.email?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Contact Number</p>
        <input className={`${errors.contact_number && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.contact_number ?? ""} {...register("contact_number", {required: "Contact Number is required"})}  />
        {errors.contact_number && <p className={`${errorStyle}`} role="alert">{errors.contact_number?.message}</p>}
      </div>

      <div className={`${inputContainerStyle}`}>
        <p className={`${inputHeaderStyle}`}>Bank Details</p>
        <input className={`${errors.bank_details && errorInputStyle} ${inputStyle}`} type="text" placeholder="" defaultValue={profileData?.bank_details ?? ""} {...register("bank_details", {required: "Bank Details is required"})}  />
        {errors.bank_details && <p className={`${errorStyle}`} role="alert">{errors.bank_details?.message}</p>}
      </div>
      
      <input type="submit" className="bg-gray-500 rounded px-4 py-2 mt-4 text-white active:bg-gray-700" />
    </form>
    </div>
  )
}
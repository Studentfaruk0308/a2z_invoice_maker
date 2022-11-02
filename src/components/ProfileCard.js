import React from 'react'
// import "./ProfileCard.css"

export default function ProfileCard(props) {
  return (
    <div className="w3-table w3-striped w3-bordered">
        <tr>
            <th>Profile Name</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>ABN</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Bank Details</th>
        </tr>
        <tr>
        <td>{props.profile_name}</td>
        <td>{props.compamny_name}</td>
        <td>{props.address}</td>
        <td>{props.abn}</td>
        <td>{props.email}</td>
        <td>{props.contact_number}</td>
        <td>{props.bank_details}</td>
        </tr>
    </div>
  )
}
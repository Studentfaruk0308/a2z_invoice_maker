import React from 'react'
import "./InvoiceCard.css"

export default function InvoiceCard(props) {
  return (
    <div className="w3-table w3-striped w3-bordered">
        <p>{props.name}</p>
     
    </div>
  )
}
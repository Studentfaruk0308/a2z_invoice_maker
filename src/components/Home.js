import React from 'react'
import invoice from '../images/invoice.png'


export default function Home() {
  return (
    <div>
        <div className='invoice'>
             <img src={invoice} alt="Invoice Template" />
        </div>
    </div>
  )
}
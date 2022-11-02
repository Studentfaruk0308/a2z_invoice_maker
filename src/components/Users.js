import React, { useState, useEffect} from 'react'
import { getUsersList } from '../api/UsersApi'
// import "./Users.css"
import w3css from "w3-css"



export default function Users() {
    const [Userdata, setUserdata] = useState(null)

    useEffect(() => {
        async function fetchUserData(){
            const data = await getUsersList()
            console.log(data)
            setUserdata(data)
        }
            fetchUserData()
    }, [])

    if (Userdata === null){
        return<div>
            <h1>
                NO USERS DATA AVAILABLE
            </h1>
        </div>
    }
  return (
    <div>
      <h1>ALL USERS DATA</h1>
      <table className="w3-table w3-hoverable w3-border w3-bordered w3-striped">
        <thead>
            <tr>
                <th>USER ID</th>
                <th>USER UID</th>
                <th>USER NAME</th>
                <th>USER EMAIL</th>
            </tr>
        </thead>
        <tbody>
            {Userdata.map(u => <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.uid}</td>
                <td>{u.name}</td>
                <td>{u.email}</td> 
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

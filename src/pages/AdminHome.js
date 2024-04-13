import React, { useContext, useEffect } from 'react'
import Navbar from '../component/Navbar'
import './adminhome.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/FirebaseContext'


function AdminHome() {
    const navigate=useNavigate()
    const {user}=useContext(AuthContext)
    useEffect(()=>{
        if(!user){
            navigate('/signin')
        }

    })
   
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className="contain">
        <button type="button" className="btn btns btn-danger m-5 " onClick={()=>{navigate('/createevent')}}>Create Event</button>
        <button type="button" className="btn btns btn-danger m-5">Edit Event</button>
        <button type="button" className="btn btns btn-danger m-5">Users</button>
        <button type="button" className="btn btns btn-danger m-5">Bookings</button>

        </div>
      </div>
    </div>
  )
}

export default AdminHome

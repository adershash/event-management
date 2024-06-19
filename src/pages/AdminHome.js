import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import './adminhome.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/FirebaseContext'
import CreateEvent from './CreateEvent'
import EditEvent from './EditEvent'
import Users from './Users'
import Book from './Book'
import AdminCertificate from './certificate/AdminCertificate'


function AdminHome() {
    const navigate=useNavigate()
    const {user}=useContext(AuthContext)
    let [createEvent,setCreateEvent] = useState(0)
    let [editEvent,setEditEvent] = useState(0)
    let [userEvent,setUserEvent] = useState(0)
    let [bookingEvent,setBookingEvent]=useState(0)
    let [certificateEvent,setCertificateEvent]=useState(0)
    // useEffect(()=>{
    //     if(!user){
    //         navigate('/signin')
    //     }
    // })
   useEffect(()=>setCreateEvent(1),[])
  return (
    <div className='dash'>
      <Navbar></Navbar>
      <div className='main-section'>
        <div className="contain">
          <div  className={`nav-btn ${createEvent?'active':null}`} onClick={()=>{
            /*navigate('/createevent')*/
            setCreateEvent(1)
            setUserEvent(0)
            setEditEvent(0)
            setBookingEvent(0)
            setCertificateEvent(0)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
          </svg>
            Create Event
          </div>
          <div type="button" style={editEvent?{background: "#c382ec"}:null} className="nav-btn" onClick={()=>{
            setCreateEvent(0)
            setUserEvent(0)
            setEditEvent(1)
            setBookingEvent(0)
            setCertificateEvent(0)
            
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
          </svg>
            Edit Event
          </div>
          <div type="button" style={userEvent?{background: "#c382ec"}:null} className="nav-btn" onClick={()=>{
            setCreateEvent(0)
            setEditEvent(0)
            setUserEvent(1)
            setBookingEvent(0)
            setCertificateEvent(0)
            
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
          </svg>
            Users
          </div>
          <div type="button" className="nav-btn" style={bookingEvent?{background:'#c382ec'}:null} onClick={()=>{
            setCreateEvent(0)
            setEditEvent(0)
            setUserEvent(0)
            setBookingEvent(1)
            setCertificateEvent(0)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
          </svg>
            Bookings
          </div>
          <div type="button" className="nav-btn" style={certificateEvent?{background:'#c382ec'}:null} onClick={()=>{
            setCreateEvent(0)
            setEditEvent(0)
            setUserEvent(0)
            setBookingEvent(0)
            setCertificateEvent(1)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
</svg>

            Certificate
          </div>
        </div>
        <div className='right'>
          {
              createEvent?<CreateEvent/>:null
            
          }
          {
              
              editEvent?<EditEvent />:null
          }
          {
            userEvent?<Users />:null
          }
          {
            bookingEvent?<Book/>:null
            
          }
          {
            certificateEvent?<AdminCertificate/>:null
          }
        </div>
      </div>
    </div>
  )
}

export default AdminHome

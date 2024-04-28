import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import "./viewpost.css"
import { AuthContext,FirebaseContext } from '../store/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { addDoc, collection,updateDoc,doc } from 'firebase/firestore'
import { auth } from '../firebase/Config'
function ViewPost() {
  const date=new Date()
  const {db}=useContext(FirebaseContext)
  const {state}=useLocation()
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  let data=state.ev.noftickets
  const [details,setDetails]=useState({})
 const [updata,setupData]=useState(state.ev.noftickets-1)

 useEffect(()=>{
  setDetails(state.ev)
  
 })

 const onClicked=()=>{
  if(state.ev.noftickets<=0){
    alert('tickets not available')
  }
  else{
  if(user==null){
    navigate('/signin')
  }
  else{
    
    const dbref=collection(db,'bookings')
    const docref=doc(db,'events',state.ev.id)
    let sub=updata
    setupData(sub-1)
    console.log(updata)
   
     updateDoc(docref,{noftickets:updata})
    

     data={noftickets:updata}
    addDoc(dbref,{eventName:state.ev.eventName,userid:auth.currentUser.uid,userName:user.displayName,bookedAt:date.toDateString(),docid:state.ev.id},)
   console.log(sub)
    if(sub==updata){
      setTimeout(() => {
        navigate('/tickets',{state:{details}})
    }, 5000);
      
    
    }


  }
}
 }
 
  
  

  return (
    <div className='view-post'>
      <div className='view-main'>
        <div className="view-image">
           <img src={state.ev.url} alt="" /> 

        </div>
        <div className="view-details">
            <h3>{state.ev.eventName}</h3>
            <h4>{`Coordinator: ${state.ev.coordinator}`}</h4>
            <h4>{`Date: ${state.ev.eventDate}`}</h4>
            <h4>{state.ev.time!==undefined?`Time: ${state.ev.time}`:null}</h4>
            <button onClick={onClicked}>Book now</button>
        </div>
      </div>
    </div>
  )
}

export default ViewPost

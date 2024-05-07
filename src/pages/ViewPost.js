import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import "./viewpost.css"
import { AuthContext,FirebaseContext } from '../store/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { addDoc, collection,updateDoc,doc } from 'firebase/firestore'
import { auth } from '../firebase/Config'
import ViewSeats from '../seat/ViewSeats'
function ViewPost() {
  const date=new Date()
  const {db}=useContext(FirebaseContext)
  const {state}=useLocation()
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  let data=state.ev.noftickets
  const [details,setDetails]=useState({})
 const [updata,setupData]=useState(state.ev.noftickets)
 const [flag,setFlag]=useState(false)
 const [ticketid,setTicket]=useState('')

 useEffect(()=>{
  setDetails(state.ev)
  
 })
 console.log("details",details)

 const onClicked=()=>{
  if(state.ev.eventType==='stage'){
    state.ev.noftickets=1000000000
    console.log('stage',state.ev.noftickets)
  }
  
  if(parseInt(state.ev.noftickets)<=state.ev.ticketNo ){
    alert('tickets not available')
  }
  else{
  if(user==null){
    navigate('/signin')
  }
  else{
    
    
    
    
    const docref=doc(db,'events',state.ev.id)
    let sub=updata
    setupData(parseInt(state.ev.noftickets)-1)
    console.log(updata)
   
     updateDoc(docref,{ticketNo:parseInt(state.ev.ticketNo)+1})
    if(state.ev.eventType==="stage"){
      // navigate('/viewseats',{state:{details}})
      setFlag(true)

      
    }
    else {
      const dbref=collection(db,'bookings')

     data={noftickets:updata}
    addDoc(dbref,{eventName:state.ev.eventName,userid:auth.currentUser.uid,userName:user.displayName,bookedAt:date.toDateString(),docid:state.ev.id,ticketno:details.ticketNo+1,eventType:state.ev.eventType,seatNumbers:"empty"}).then((snap)=>{
      
      details.ticid=snap.id
      details.ticno=state.ev.ticketNo+1

   console.log(details)
    })
   console.log(sub)
   //console.log(ticketid)
   
   
      setTimeout(() => {
        navigate('/tickets',{state:{details}})
    }, 5000);
  
      
    
    


  }
}
}
 }
 
  
  

  return (
    
    <div className='view-post'>
     {!flag && <div className='view-main'>
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
      </div>}
      {flag && <ViewSeats details={details}></ViewSeats>}
    </div>
  )
}

export default ViewPost

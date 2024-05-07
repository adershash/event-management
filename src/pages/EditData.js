import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FirebaseContext } from '../store/FirebaseContext'
import { collection, doc, updateDoc } from 'firebase/firestore'


function EditData() {
    const {state}=useLocation()
    const {db}=useContext(FirebaseContext)


    const [formData,setFormData]=useState({
        eventName:state.ev.eventName,
        coordinator:state.ev.coordinator,
        time:state.ev.time,
        eventDate:state.ev.eventDate,
    
       
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
        

    }

    const handleSubmit=()=>{
        let l;
       
       
   
     const docref=doc(db,'events',state.ev.id)
     updateDoc(docref,formData).then(()=>{

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Event has been Edited",
            showConfirmButton: false,
            timer: 1500
          });

     })
       
    
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Event has been Edited",
      showConfirmButton: false,
      timer: 1500
    });
    
   
    
    }


  return (
    <div>
        <div className='create-event'>
      <h4>Edit Event</h4>
      <div className='form'>
        <div className='row'>
          <h6 class="mb-0">Event Name</h6>
          <input type="text" class="inp" name='eventName' value={formData.eventName} onChange={handleChange} defaultValue={state.ev.eventName} placeholder={state.ev.eventName} /> 
        </div>
        
        <div className='row'>
          <h6 class="mb-0">Event coordinator</h6>
          <input type="text" class="inp" name='coordinator' value={formData.coordinator} onChange={handleChange}/> 
        </div>
       
        <div className='row'>
          <h6 class="mb-0">Time</h6>
          <input type="time" class="inp" name='time' value={formData.time} onChange={handleChange} />
        </div>
        <div className='row'>
          <h6 class="mb-0">Event date</h6>
          <input type="date" class="inp" name='eventDate' value={formData.eventDate} onChange={handleChange}/>
        </div>
       
        <div className='row'>
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="sub-btn" onClick={handleSubmit}>Edit Event</button>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default EditData

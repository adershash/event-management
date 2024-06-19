import React, { useState,useContext } from 'react'
import './createevent.css'
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { AuthContext, FirebaseContext } from '../store/FirebaseContext'
import { addDoc, collection } from 'firebase/firestore'
import { auth } from '../firebase/Config'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { doc } from 'firebase/firestore/lite'

function CreateEvent() {
    const {db}=useContext(FirebaseContext)
    const {user}=useContext(AuthContext)
    const [poster,setPoster]=useState(null)
    const [docid,setDocid]=useState({evid:''})
    const date=new Date()
    const navigate=useNavigate()
    
    let t_date=new Date()
    
  

    const [formData,setFormData]=useState({
        eventName:'',
        eventType:'',
        coordinator:'',
        noftickets:'',
        time:'',
        eventDate:'',
    
       
    })

    

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
        

    }
    
  
    let e_date=new Date(formData.eventDate)
    let hr=parseInt(formData.time.slice(0,2))
    let min=parseInt(formData.time.slice(3,5))
    e_date.setHours(hr,min,0)
    console.log(e_date)
    console.log(t_date.getTime())

const handleSubmit=()=>{
    let l;
   if(!poster){
    alert("please select a file")
   }
   if(formData.eventName==='' || formData.eventType===''|| formData.eventDate===''||formData.coordinator===''||formData.time===''){
    alert('all fields are required')
   }
   else{
    if(t_date.getTime()>e_date.getTime()){
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Invalid Date Entered",
        showConfirmButton: false,
        timer: 1500
      });
      
    }
    else{
   
   const storage=getStorage()
   const storageRef = ref(storage, `/images/${poster.name}`)
   
   const uploadTask = uploadBytesResumable(storageRef,poster)
   uploadTask.on(
    "state_changed",
    (snapshot) => {
        const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
       // setPercent(percent);
    },
    (err) => console.log(err),
    () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            const dbref=collection(db,'events')

addDoc(dbref,{eventName:formData.eventName,url,userid:auth.currentUser.uid,eventType:formData.eventType,eventDate:formData.eventDate,coordinator:formData.coordinator,time:formData.time,noftickets:formData.noftickets,createdAt:date.toDateString(),ticketNo:0}).then(
  (res)=>{setFormData({
    eventName:'',
    eventType:'',
    coordinator:'',
    noftickets:'',
    time:'',
    eventDate:'',
    

   
})
docid.evid=res.id
console.log(docid.evid)
console.log(res.id)

setPoster(null)

Swal.fire({
  position: "center",
  icon: "success",
  title: "Your Event has been Created",
  showConfirmButton: false,
  timer: 1500
});

if(formData.eventType==='stage'){
  navigate('/customseat',{state:{docid}})
}

})
             
        });
    }
);
 



   }}}

  return (
    <div className='create-event'>
      <h4>Create Event</h4>
      <div className='form'>
        <div className='row'>
          <h6 class="mb-0">Event Name</h6>
          <input type="text" class="inp" name='eventName' value={formData.eventName} onChange={handleChange} required/> 
        </div>
        <div className='row'>
          <h6 class="mb-0">Event Type</h6>
          <select  className='inp' name="eventType" value={formData.eventType} onChange={handleChange} defaultValue={'Select type'} required >
                <option value="">Select type</option>
                    <option value="stage">Stage</option>
                    <option value="workshop">Workshop</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                </select>
        </div>
        <div className='row'>
          <h6 class="mb-0">Event coordinator</h6>
          <input type="text" class="inp" name='coordinator' value={formData.coordinator} onChange={handleChange} required/> 
        </div>
        {formData.eventType!=='stage'?
        <div className='row'>
          <h6 class="mb-0">Number of tickets</h6>
          <input type="number" class="inp"  name='noftickets' value={formData.noftickets} onChange={handleChange} required />
        </div>:null}
        <div className='row'>
          <h6 class="mb-0">Time</h6>
          <input type="time" class="inp" name='time' value={formData.time} onChange={handleChange} required />
        </div>
        <div className='row'>
          <h6 class="mb-0">Event date</h6>
          <input type="date" class="inp" name='eventDate' value={formData.eventDate} onChange={handleChange} required/>
        </div>
        <div className='row'>
          <h6 class="mb-0">Upload poster</h6>
          <div className='inp-upload'>
            <input class="inp-u" id="formFileLg" type="file" name='poster' value={formData.poster} onChange={(e)=>{setPoster(e.target.files[0]);console.log(poster)}}/>
            <div class="">
                  Upload event poster or any other relevant file. Max file
                  size 50 MB
            </div>
          </div>
          
        </div>
        <div className='row'>
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="sub-btn" onClick={handleSubmit}>Create Event</button>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent

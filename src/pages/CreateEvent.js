import React, { useState,useContext } from 'react'
import './createevent.css'
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { AuthContext, FirebaseContext } from '../store/FirebaseContext'
import { addDoc, collection } from 'firebase/firestore'
import { auth } from '../firebase/Config'
import { useNavigate } from 'react-router-dom'

function CreateEvent() {
    const {db}=useContext(FirebaseContext)
    const {user}=useContext(AuthContext)
    const [poster,setPoster]=useState(null)
    const date=new Date()
    const navigate=useNavigate()
  

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

const handleSubmit=()=>{
    let l;
   if(!poster){
    alert("please select a file")
   }
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

addDoc(dbref,{eventName:formData.eventName,url,userid:auth.currentUser.uid,eventType:formData.eventType,eventDate:formData.eventDate,coordinator:formData.coordinator,time:formData.time,noftickets:formData.noftickets,createdAt:date.toDateString()})
             
        });
    }
);
 
navigate('/adminhome')


}

  return (
    <div className='create-event-main'>
     <section class="vh-100 main-section">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-9">

        <h1 class="text-white mb-4">Create Event</h1>

        <div class="card-create" >
          <div class="card-body">

            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Event Name</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="text" class="form-control form-control-lg" name='eventName' value={formData.eventName} onChange={handleChange}/>

              </div>
            </div>

            <hr class="mx-n3"/>

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Event Type</h6>

              </div>
              <div class="col-md-9 pe-5">

              
                <select  className='form-control from-control-lg' name="eventType" value={formData.eventType} onChange={handleChange} defaultValue={'Select type'} >
                <option value="">Select type</option>
                    <option value="stage">Stage</option>
                    <option value="workshop">Workshop</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                </select>

              </div>
            </div>

            <hr class="mx-n3"/>

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Event coordinator</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="text" class="form-control form-control-lg" name='coordinator' value={formData.coordinator} onChange={handleChange}/>

              </div>
            </div>

            <hr class="mx-n3"/>
            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Number of tickets</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="number" class="form-control form-control-lg"  name='noftickets' value={formData.noftickets} onChange={handleChange} />

              </div>
            </div>


            <hr class="mx-n3"/>
            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Time</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="time" class="form-control form-control-lg" name='time' value={formData.time} onChange={handleChange} />

              </div>
            </div>
            <hr class="mx-n3"/>
            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Event date</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="date" class="form-control form-control-lg" name='eventDate' value={formData.eventDate} onChange={handleChange}/>

              </div>
            </div>


            

            <hr class="mx-n3"/>

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Upload poster</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input class="form-control form-control-lg" id="formFileLg" type="file" name='poster' value={formData.poster} onChange={(e)=>{setPoster(e.target.files[0]);console.log(poster)}}/>
                <div class="small text-muted mt-2">Upload event poster or any other relevant file. Max file
                  size 50 MB</div>

              </div>
            </div>

            <hr class="mx-n3"/>

            <div class="px-5 py-4">
              <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn create-event-btnctl btn-primary  btn-lg" onClick={handleSubmit}>Create Event</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default CreateEvent

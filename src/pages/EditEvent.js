import React, { useState,useContext,useEffect } from 'react'
import './editevent.css'
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { AuthContext, FirebaseContext } from '../store/FirebaseContext'
import { addDoc, collection,getDocs,where,query, doc, deleteDoc } from 'firebase/firestore'
import { auth } from '../firebase/Config'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'




function EditEvent() {
    
    const [evt,setEvents]=useState([])
    const [booked,setBooked]=useState([])
    const [certificate,setCertify]=useState([])
    
   const{db}=useContext(FirebaseContext)
    useEffect(()=>{
  const ref=collection(db,'events')
  
  
  getDocs(ref).then((snapshot)=>{
    const allevents=snapshot.docs.map((docs)=>{
      return{
        ...docs.data(),
        id:docs.id
      }
      
    })
   
    setEvents(allevents)
    //console.log(evt)
    
  
  })


 
  
  
  
    })

    useEffect(()=>{
        const ref1=collection(db,'bookings')
        getDocs(ref1).then((snap)=>{
            const allevents=snap.docs.map((docs)=>{
                return{
                ...docs.data(),
                id:docs.id
                }

            })
            setBooked(allevents)

        })

        const ref2=collection(db,'certificate')
        getDocs(ref2).then((snap)=>{
            const allevents=snap.docs.map((docs)=>{
                return{
                ...docs.data(),
                id:docs.id
                }

            })
            setCertify(allevents)

        })
        
    },[])



   
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
    <div className='edit-event'>
        <h4>Edit Event</h4>
        <div className='card-section'>
            {
                evt.map((ev)=>{
                    return(
                        <div className='e-card'>
                <p>{ev.eventName}</p>
                <div className='img-box'>
                    <img src={ev.url} alt='img'></img>
                </div>
            
                <div className='control-box'>
                    <button type='button' className='btn-update'  onClick={()=>{
                    navigate('/editdata',{state:{ev}})
                }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ffffff" className="w-4 h-4">
                        <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                        <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                        </svg>
                        update
                    </button>
                    <button type='button' className='btn-delete' onClick={()=>{
                        const docref=doc(db,'events',ev.id)
                        let bookedid=booked.filter((data)=>data.docid.includes(ev.id))
                        let certifyevtid=certificate.filter((data)=>data.evtid.includes(ev.id))

                        bookedid.map((data)=>{
                        var docref2=doc(db,'bookings',data.id)
                        deleteDoc(docref2)
                        console.log(bookedid)
                    })
                    certifyevtid.map((data)=>{
                        var docref2=doc(db,'certificate',data.id)
                        deleteDoc(docref2)
                        console.log(bookedid)
                    })
                        deleteDoc(docref).then(()=>{
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Event has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            
                        })
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ffffff" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                        </svg>
                        Delete
                    </button>

                </div>
            </div>

                    )
                })
            }
            
        </div>
    </div>
  )
}

export default EditEvent

import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../store/FirebaseContext'
import { where,query,collection,getDocs, addDoc } from 'firebase/firestore'
import './admincertificate.css'

function AdminCertificate() {
    const {db}=useContext(FirebaseContext)
    const [evt,setEvents]=useState([])
    const [evt1,setEvents1]=useState([])
    
    let si=0;
   useEffect(()=>{
    const ref=collection(db,'events')
    const ref2=collection(db,'bookings')
    const q=query(ref,where("eventType",'==','workshop'))
    const q2=query(ref2,where("eventType",'==','workshop'))
    
    getDocs(q).then((snapshot)=>{
      
      const allevents=snapshot.docs.map((docs)=>{
        
        return{
          ...docs.data(),
          id:docs.id,
          
    
        }
        
      })
     
      setEvents(allevents)
      console.log(evt)
      
    
    })

    getDocs(q).then((snapshot)=>{
      
        const allevents=snapshot.docs.map((docs)=>{
          
          return{
            ...docs.data(),
            id:docs.id,
            
      
          }
          
        })
       
        setEvents1(allevents)
        console.log(evt)
        
      
      })

},[])

const onclickHandler=(id)=>{


}



  return (
    <div className='users9' style={{display:'block'}}>
    <h4>Workshop</h4>
    
               
    <div className='tb-section'>
        <table className='table11'>
            <thead>
                        <tr>
                            <th>SI No</th>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Certify</th>
                            
                        </tr>
            </thead>
            
            <tbody>
            
                 
                
                    
                  
                    
            {evt.map((ev)=>{
                si=si+1
                return(
                <tr>
                    <td>{si}</td>
                    <td>{ev.eventName}</td>
                    <td>{ev.eventDate}</td>
                    <td><Btn ev={ev} evt1={evt1}></Btn></td>
                    

                </tr>
           ) })}
          
               
              
          
               
            </tbody>
            
            
        </table>
        
    </div>
    
   
</div>
  )
}

function Btn(props){

    


    const [active,setActive]=useState(false)
    const [cvt,setCvt]=useState([])
    const {db}=useContext(FirebaseContext)
    const dbref=collection(db,'certificate')
    let flag=false

    useEffect(()=>{
      getDocs(dbref).then((snapshot)=>{
      
        const allevents=snapshot.docs.map((docs)=>{
          
          return{
            ...docs.data(),
            id:docs.id,
            
      
          }
          
        })
       
        setCvt(allevents)
        console.log('cvt',cvt)
        
      
      })


    },[])

    cvt.map((cv)=>{
      if(cv.eventName===props.ev.eventName){
        
        flag=true
        console.log('flag',flag)
        

      }
    })
    
    const onclickHandler=()=>{
        setActive(!active)

       

        props.evt1.map((ev1)=>{
            console.log(ev1.eventName)
            if(props.ev.eventName===ev1.eventName){
        
        addDoc(dbref,{evtid:props.ev.id,flag:1,eventName:props.ev.eventName,eventDate:props.ev.eventDate,userid:ev1.userid})
            }
    })
    }



    return(<button  id='admin-publish-btn' disabled={flag?true:false} style={{background:active&&'green',backgroundColor:flag?'green':'red'}} onClick={()=>{onclickHandler()}}>{active||flag?'Published':'Publish'}</button>)
}

export default AdminCertificate

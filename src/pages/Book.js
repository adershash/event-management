import React from 'react'
import Table from './Table'
import './book.css'
import { useState,useEffect,useContext } from 'react'
import { FirebaseContext,AuthContext } from '../store/FirebaseContext'
import { getDocs,query,collection,where } from 'firebase/firestore'

function Book() {
  const [evt,setEvents]=useState([])
  const [evt1,setEvents1]=useState([])
  const [evt2,setEvents2]=useState([])
  const [evt3,setEvents3]=useState([])
 const{db}=useContext(FirebaseContext)
 const {user}=useContext(AuthContext)
 let si1=0
 let si2=0
 let si3=0
 let si4=0
  useEffect(()=>{
   
const ref=collection(db,'bookings')
const q=query(ref,where("eventType",'==','workshop'))
const q1=query(ref,where("eventType",'==','sports'))
const q2=query(ref,where("eventType",'==','other'))
const q3=query(ref,where("eventType",'==','stage'))
getDocs(q).then((snapshot)=>{
  
  const allevents=snapshot.docs.map((docs)=>{
    si1=si1+1
    return{
      ...docs.data(),
      id:docs.id,
      si:si1

    }
    
  })
 
  setEvents(allevents)
  console.log(evt)
  

})
getDocs(q1).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    si2=si2+1
    return{
      ...docs.data(),
      id:docs.id,
      si:si2
    }
    
  })
 
  setEvents1(allevents)
  

})
getDocs(q2).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    si3+=1
    return{
      ...docs.data(),
      id:docs.id,
      si:si3
    }
    
  })
 
  setEvents2(allevents)
  

})
getDocs(q3).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    si4=si4+1
    return{
      ...docs.data(),
      id:docs.id,
      si:si4
    }
    
  })
 
  setEvents3(allevents)
  

})


  },[])


  
  return (
    <div className='Book-main'>
    
      <div  className='Book'>
       
        {evt.length!==0?<Table title={'Workshop'} data={evt}></Table>:null}
        {evt3.length!==0?<Table title={'Stage'} data={evt3}></Table>:null}
       {evt1.length!==0? <Table title={'Sports'} data={evt1}></Table>:null}
       {evt2.length!==0? <Table title={'Others'} data={evt2}></Table>:null}
        
        

      </div>
      </div>

      
    
  )
}

export default Book

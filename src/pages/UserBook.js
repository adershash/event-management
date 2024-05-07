import React, { useContext, useEffect, useState } from 'react'
import { AuthContext ,FirebaseContext} from '../store/FirebaseContext'
import { auth } from '../firebase/Config'
import { where,getDocs,query,collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

function UserBook() {
    const auth=getAuth()
    const user=auth.currentUser

    console.log('id',user.uid)
    let si=0
    
    const {db}=useContext(FirebaseContext)
    const [evt,setEvents]=useState([])
    useEffect(()=>{
        const ref=collection(db,'bookings')
const q=query(ref,where("userid",'==',user.uid))

getDocs(q).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    return{
      ...docs.data(),
      id:docs.id
    }
    
  })
 
  setEvents(allevents)
  console.log(evt)
  

})
    },[])
  return (
    <div>
         <div className='users9'>
        <h4>Bookings</h4>
        
                   
        <div className='tb-section'>
            <table className='table11' style={{textAlign:'center'}}>
                <thead>
                <tr >
                                <th>SI No</th>
                                <th>Event Name</th>
                                <th>Event Type</th>
                                <th>Booked At</th>
                            </tr>
                    
                </thead>
                
                <tbody>
               
                     
                    
                
                {evt.map((ev)=>{
                        si=si+1
                        return(

                            <tr style={{borderColor:'black',borderBottom:'1px solid',borderCollapse:'collapse'}}>
                                <th>{si}</th>
                                <th>{ev.eventName}</th>
                                <th>{ev.eventType}</th>
                                <th>{ev.bookedAt}</th>
                            </tr>
                  ) }) }
                  
               
                   
                </tbody>
                
                
            </table>
            
        </div>
        
       
    </div>
      
    </div>
  )
}

export default UserBook

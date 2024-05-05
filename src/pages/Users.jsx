import React from 'react'
import './users.css'
import { useState,useEffect,useContext } from 'react'
import { getDocs,collection } from 'firebase/firestore'
import { FirebaseContext } from '../store/FirebaseContext'

function Users() {

    const [evt,setEvents]=useState([])
    
    
    const{db}=useContext(FirebaseContext)
     useEffect(()=>{
   const ref=collection(db,'users')
   let si=0
   
   getDocs(ref).then((snapshot)=>{
    
     const allevents=snapshot.docs.map((docs)=>{
        si=si+1
       return{
         ...docs.data(),
         si:si
        
       }
       
     })
    
     setEvents(allevents)
     console.log(evt)
     
   
   })
  
   
   
   
     },[])

    
  return (
    <div className='users9'>
        <h4>Users</h4>
        
                   
        <div className='tb-section'>
            <table className='table11'>
                <thead>
                            <tr>
                                <th>SI No</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                </thead>
                
                <tbody>
                {evt.map((ev,ind)=>(
                     
                    
                
                    <tr>
                        <td>{ev.si}</td>
                        <td>{ev.firstName}</td>
                        <td>{ev.email}</td>

                    </tr>
                  
                ))}
                   
                </tbody>
                
                
            </table>
            
        </div>
        
       
    </div>
  )
}

export default Users

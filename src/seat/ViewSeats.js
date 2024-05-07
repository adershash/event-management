import React from 'react'
import { FirebaseContext,AuthContext } from '../store/FirebaseContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState,useContext,useEffect } from 'react'
import { getDocs,collection,where,query,addDoc } from 'firebase/firestore'
import Seat from './Seat'
import { auth } from '../firebase/Config'
import './viewseats.css'

function ViewSeats(props) {
    const {state}=useLocation()
    const [evt,setEvents]=useState([])
    const [count,setCount]=useState(0)
     const [seats,setSeats]=useState('')
    const [rseat,setRseat]=useState(0)
    const [seated,setSeated] = useState('')
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
   
    
    
    
    
    const date=new Date()
   
    //let count=0
    // console.log(props.details)
    const{db}=useContext(FirebaseContext)

    useEffect(()=>{
        const ref=collection(db,'seat')
        const q=query(ref,where("eventID",'==',props.details.id))
        
        getDocs(q).then((snapshot)=>{
          const allevents=snapshot.docs.map((docs)=>{
            return{
              ...docs.data(),
              id:docs.id
            }
            
          },[])
         
          setEvents(allevents)
          // console.log(evt)
          
        
        })

       
    },[])
    

  //  console.log(evt[0].rows)
    let section=0
    let row=0
    let rseats=0
  //  console.log(section)
  
  const handleClick = (num,seat) => {
    
    console.log(num)
    console.log(seat)
    //seat += seat
    if(num){
      //seats=seats.replace(' '+seat,'')
      setSeats(seats.replace(' '+seat,''))
      setCount(count-1)
      

    }
    else{
      //setSeats(seats+' '+seat)
      setSeats(seats+' '+seat)
      setCount(count+1)
      
    }
     console.log(seats)
    // console.log(count)
  };

  const handleBook=()=>{
    console.log(props.details)
    const dbref=collection(db,'bookings')
    addDoc(dbref,{eventName:props.details.eventName,userid:auth.currentUser.uid,userName:user.displayName,bookedAt:date.toDateString(),docid:props.details.id,ticketno:parseInt(state.ev.noftickets-1),eventType:props.details.eventType,seatNumbers:seats,nofSeat:count}).then((snap)=>{
      
      props.details.seatNumbers=seats
      props.details.ticid=snap.id
      const details=props.details
      
      navigate('/ticketsstage',{state:{details}})
      
      
    })
  }
   
    
  return (
    <div>
    
    <div className='row' id="classroom">
          <div className='=subheading'>
           {evt.map((ev)=>{section=parseInt(ev.sections)
           row=parseInt(ev.rows)
           rseats=parseInt(ev.rseat)

           })}
          </div>
           <div className='=h3'>
            <p>select seats</p>
          </div>
          <div className='desk'>
          <button id="stage"><i className="fa-solid fa-user " > Stage</i></button>
          </div>
          { Array(parseInt(section)).fill(true).map((item,ind)=>(
            
          <Column section={section} rows={row} sectionInd={ind} rseats={rseats} handleClick={handleClick} details={props.details} />))}
          </div>
          <div>
          <div className='selected'>
          
         
        </div>
        <div style={{textAlign:'center'}}>
            
            <p>{`selected seat : ${seats}`}</p>
            <p>{`number of seat selected : ${count}`}</p>
            <button onClick={handleBook} className='seat-booking-btn' id='seat-booking-btn'>book now</button>
          </div>
          </div>      
         
      </div>
  )
      
    
    
}

function Column(props) {

   let c = ''
    if(props.sectionInd===0){c='A'}else if(props.sectionInd===1){c='B'}else if(props.sectionInd===2){c='C'}else{c='D'}
  
    return(
        <div className='column'>
          <h4 style={{textAlign:'center'}}>Section - {c}</h4>
       {Array(parseInt(props.rows)).fill(true).map((item, index) => (
          <Seat r={c+''+`${index+1}`} st1={props.st1} st2={props.st2} st3={props.st3}  noRow={props.rseats} sectionInd={props.sectionInd} rowInd={index} handleClick={props.handleClick} details={props.details}/>
        
        ))} 
        {/* {console.log(props.str4)} */}
      </div>
    )
}

      
    
  

export default ViewSeats

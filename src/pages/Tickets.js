import React, { useEffect, useRef, useState } from 'react'
import './tickets.css'
import { AuthContext,FirebaseContext } from '../store/FirebaseContext'
import { useNavigate,useLocation } from 'react-router-dom'
import { useContext } from 'react'
import QRCode from "react-qr-code";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { collection, query,getDocs,where } from 'firebase/firestore'



const options: Options = {
    filename: "ticket.pdf",
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.EXTREME,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "landscape"
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/jpeg",
      qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true
      }
    }
  };
  
  // you can also use a function to return the target element besides using React refs
  const getTargetElement = () => document.getElementById("container");
  
  const downloadPdf = () => generatePDF(getTargetElement, options);
  
function Tickets() {
  const {state}=useLocation()
  const {db}=useContext(FirebaseContext)
  const [evt,setEvent]=useState([])
  const [ticketid,setTicketid]=useState({ticid:''})
  useEffect(()=>{
    const dbref=collection(db,'events')
    const q=query(dbref,where("eventName","==",state.details.eventName))
    getDocs(q).then((snap)=>{
      ticketid.ticid=snap.id

      const allevents=
      snap.docs.map((docs)=>{
        return{
          ...docs.data()
          


        }

      })
      setEvent(allevents)
      console.log('evt',evt)
    })
  },[])
  

   
   
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
    //console.log(state)
    // const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
   const targetref=useRef()

   const handleClick=()=>{
    setTimeout(()=>{downloadPdf() 
       navigate('/')},4000) 
   
    
}
  return (
    
      <div className='view-ticket'>
      <div className='view-ticket-main'id='container' ref={targetref}>
        <div className="view-image">
           <img src={state.details.url} alt="" /> 

        </div>
        {evt.map((ev)=>(
        <div className="view-details">
            <h3>{state.details.eventName?`Event Name:${state.details.eventName}`:null}</h3>
            <h4>{state.details.coordinator?`Coordinator:${state.details.coordinator}`:null}</h4>
            <h4>{`Date: ${state.details.eventDate}`}</h4>
            <h4>{`Participant: ${user.displayName}`}</h4>
            <h4>{state.details.time!==undefined?`Time: ${state.details.time}`:null}</h4>
            
            <h4>{`Ticket id:${state.details.ticid}`}</h4>
            <h4>{ev.ticketNo!==0?`Ticket no:${ev.ticketNo}`:null}</h4>
            
             

            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={user.displayName}
    viewBox={`0 0 256 256`}
    />
</div>

        </div>
         )) }
        
      </div>
      <button onClick={handleClick}>Download Ticket</button> 
      
    </div>
  

  )
}

export default Tickets

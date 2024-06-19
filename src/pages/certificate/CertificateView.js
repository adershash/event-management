import React, { useEffect } from 'react'
import './certificateview.css'
import { useState,useContext } from 'react'
import { collection, query, where,getDocs } from 'firebase/firestore'
import { FirebaseContext } from '../../store/FirebaseContext'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function CertificateView() {
    const [evt,setEvents]=useState([])
    const [evt2,setEvents2]=useState([])
    const [wrk,setWrk]=useState([])
    const auth=getAuth()
    const user=auth.currentUser
    console.log('uid',user.uid)
    let si=0
    
    
    const{db}=useContext(FirebaseContext)

    const ref1=collection(db,'bookings')
  const q1=query(ref1,where('userid','==',user.uid))
     useEffect(()=>{
   const ref=collection(db,'certificate')
   
   
   
   getDocs(ref).then((snapshot)=>{
     const allevents=snapshot.docs.map((docs)=>{
       return{
         ...docs.data(),
         id:docs.id
       }

       
     })
     
    
     setEvents(allevents)
     console.log('certificate',evt)

     
   
   })
   
  
  
     },[])

     useEffect(()=>{

      getDocs(q1).then((snapshot)=>{
        const allevents=snapshot.docs.map((docs)=>{
          return{
            ...docs.data(),
            id:docs.id
          }
    
          
        })
        
       
        setEvents2(allevents)
        console.log('booking',evt2)
        setWrk(evt2.filter((data)=>{return(data.eventType.includes('workshop'))}))
        console.log('wrk',wrk)
        
        
      
      })
     })

     

     
    //  useEffect(()=>{
    //     evt.map((ev)=>{
    //         console.log("name",ev.eventName)

    //     let q=query(evtref,where('eventName','==',ev.eventName))
       
    //         getDocs(evtref).then((snapshot)=>{
    //             const allevents=snapshot.docs.map((docs)=>{
    //               return{
    //                 ...docs.data(),
    //                 id:docs.id
    //               }
                  
    //             })
               
    //             setEvents2(allevents)
    //             console.log('ev2',evt2)
                
              
    //           })
             


    //         }) },[])


      
// setWrk(evt2.filter((data)=>{return(data.eventType.includes('workshop'))}))
// console.log('wrk',wrk)


   





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
                                <th>Event Date</th>
                                <th>View</th>
                            </tr>
                    
                </thead>
                
                <tbody>
               
                     
                    
                
                
                        
                       
                      {wrk.map((wk)=>{
                        si=si+1
                        return(
                            <tr style={{borderColor:'black',borderBottom:'1px solid',borderCollapse:'collapse'}}>
                                <th>{si}</th>
                                <th>{wk.eventName}</th>
                                <th>{wk.bookedAt}</th>
                                <th><Btn1 wk={wk} evt={evt}></Btn1></th>
                            </tr>

                          )}) }
                
                  
               
                   
                </tbody>
                
                
            </table>
            
        </div>
        
       
    </div>
      
    </div>

  )
}
function Btn1(props){
    


    const [active,setActive]=useState(false)
    const [cdata,setCdata]=useState([])
    let cd=props.evt
    let Cdata
    const navigate=useNavigate()
   
    const onclickHandler=()=>{

        setActive(!active)
        setCdata(cd.filter((data)=>{return(data.eventName.includes(props.wk.eventName))}))
      
        console.log('cdata',cdata)
        if(cdata.length===0){
          alert('not published')
        }
        else{
          Cdata=cdata[0]
          Cdata.userName=props.wk.userName
          console.log('Cdataa',Cdata)
          navigate('/certificate',{state:{Cdata}})

          
        }

        
        
        
    }



    return(<button  id='user-view-btn'  onClick={()=>{onclickHandler()}}>View</button>)
}


export default CertificateView

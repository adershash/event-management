import React, { useContext, useEffect ,useState} from 'react'
import './search.css'
import { FirebaseContext } from '../store/FirebaseContext'
import { getFirestore,collection,query,where,getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Search() {
  const navigate=useNavigate()
  
  const [srh,setSearch]=useState('')
  const [evtcpy,setevtCpy]=useState([])
  
    // const ref=collection(db,'events')
    
    // const q= query(ref,where('eventName','==',srh))
    // getDocs(q).then((snapshot)=>{
    //   const allevents=snapshot.docs.map((docs)=>{
    //     return{
    //       ...docs.data()
          
    //     }
        
    //   })
     
    //   setEvents(allevents)
    // //console.log(evt)
      
    // })


      const [evt,setEvents]=useState([])
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
  
  
})


  })

    
    
   
   
    
     

  return (
    <div>
      <div className='search-section'>
        <input type="search"  className='search' placeholder='event name' name='search' value={srh} onChange={(e)=>{setSearch(e.target.value)
        setevtCpy(evt.filter((data)=>{return(data.eventName.toLowerCase().includes(srh.toLowerCase()))}))}}/>
       
        
      </div>

      {evtcpy.map((ev) => (
        <div className='search-result'>
          <div className="card-search" onClick={()=>{navigate('/viewpost',{state:{ev}})}}>
            <div className="card-search-top">
              <img
                src={
                  ev.url
                }
               
              />
              <h1>{ev.eventName}</h1>
            </div>
           
          </div>
          </div>)
      )}

      

      
    </div>
  )
}

export default Search

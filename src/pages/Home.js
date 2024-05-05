import React,{useContext,useEffect,useState} from 'react'
import Navbar from '../component/Navbar'
import Banner from '../component/Banner'
import RowPost from '../component/RowPost'
import { FirebaseContext } from '../store/FirebaseContext'
import { collection, getDocs ,query,where} from 'firebase/firestore'


function Home() {

  const [evt,setEvents]=useState([])
  const [evt1,setEvents1]=useState([])
  const [evt2,setEvents2]=useState([])
  const [evt3,setEvents3]=useState([])
 const{db}=useContext(FirebaseContext)
  useEffect(()=>{
const ref=collection(db,'events')
const q=query(ref,where("eventType",'==','workshop'))
const q1=query(ref,where("eventType",'==','sports'))
const q2=query(ref,where("eventType",'==','other'))
const q3=query(ref,where("eventType",'==','stage'))
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
getDocs(q1).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    return{
      ...docs.data(),
      id:docs.id
    }
    
  })
 
  setEvents1(allevents)
  

})
getDocs(q2).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    return{
      ...docs.data(),
      id:docs.id
    }
    
  })
 
  setEvents2(allevents)
  

})
getDocs(q3).then((snapshot)=>{
  const allevents=snapshot.docs.map((docs)=>{
    return{
      ...docs.data(),
      id:docs.id
    }
    
  })
 
  setEvents3(allevents)
  

})


  },[])
  //const t=evt[0].eventType
  return (
   
    <div>
      <Navbar></Navbar>
      <Banner evt={evt}></Banner>
      <RowPost title='Workshop' evt={evt}></RowPost>
      <RowPost title="Sports" evt={evt1}></RowPost>
      <RowPost title="Other" evt={evt2}></RowPost>
      <RowPost title="stage" evt={evt3}></RowPost>

    </div>
  )
}

export default Home

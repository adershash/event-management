import React,{useContext,useEffect,useState} from 'react'
import Navbar from '../component/Navbar'
import Banner from '../component/Banner'
import RowPost from '../component/RowPost'
import { FirebaseContext } from '../store/FirebaseContext'
import { collection, getDocs } from 'firebase/firestore'


function Home() {

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
      <Navbar></Navbar>
      <Banner evt={evt}></Banner>
      <RowPost title="Workshop" evt={evt}></RowPost>
      <RowPost title="Stage" evt={evt}></RowPost>

    </div>
  )
}

export default Home

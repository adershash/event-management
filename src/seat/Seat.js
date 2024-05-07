import React,{ useEffect, useState,useContext} from 'react'
import { collection,getDocs,where,query } from 'firebase/firestore';
import { AuthContext, FirebaseContext } from '../store/FirebaseContext';
import './seat.css'
import Users from '../pages/Users';

function Seat(props) {

   
    const [activeB, setActive2] = useState(false);
    const [activeC, setActive3] = useState(false);
    
    
    
    

   
   
   
    let row=props.noRow
    //console.log(props.str4)

    
   


  return (
        <div className='seat'>
             {/* {console.log( typeof props.noRow)} */}
             {Array(parseInt(props.noRow)).fill(true).map((item, index) => (
              
                 <Button id={index} seat={props.r} handleClick={props.handleClick} details={props.details} ></Button>
              
          
        ))}
          
        </div>

        
  )
}

function Button(props){
  const{db}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const ref=collection(db,'bookings')
const q=query(ref,where("docid",'==',props.details.id))

  const [evt1,setEvents1]=useState([])
  console.log('docid',props.details.id)
  useEffect(()=>{


getDocs(q).then((snapshot)=>{
 
  const allevents=snapshot.docs.map((docs)=>{
     
    return{
      ...docs.data()
      
     
    }
    
  },[])
 
  setEvents1(allevents)
  console.log( 'evt',evt1)
  

})




  },[])

  let seatno=''
 
  let flag=false
  let str=''
 
  let f=true
  let sn=''
  let nm=''
  sn=props.seat+`${props.id+1}`
  //console.log('sn ',sn)
  if(evt1.length==0){
    console.log('empty')
  }
  else{
    console.log('event ',evt1)
  evt1.map((ev)=>{
    
    //console.log('ev',ev)
    console.log('nm',nm)

    nm=ev.eventName
   // console.log('name',nm)
    
   
    
     
      str=ev.seatNumbers
      console.log( 'st',str)
      
   
    if(user.displayName==="admin"){
      f=true
    }
    else{
     if(str.includes(sn)){
       f=false
     }
    }

  })
}
    
  
  

    const [activeA, setActive1] = useState(false);
    const handleClicked = (index,seat) => {
      
      index+=1
          seatno=seat+`${index}`

          
          //seatnos=seatnos.concat(seatno)
         
       console.log("-----",seatno)
            
            setActive1(!activeA)
            flag=activeA
            props.handleClick(flag,seatno)
            
            // if(activeA){
            //     props.handleClick(-1,props.r+'-L')
            // }else{
            //     props.handleClick(1,props.r+'-L')
            // }
        
    };
    return(   <button id={props.id} className="seat1" disabled={f?false:true} onClick={() => { handleClicked(props.id,props.seat) }}  style={{backgroundColor: activeA? "#1ea83c" : "white", background:f?'white':'#eee',border:f?'1px solid #1ea83c':'0',color:activeA&&'white'}}>{props.seat+(props.id+1)}</button>)
            
}

export default Seat;
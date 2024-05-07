import React, { useContext, useEffect, useState } from 'react'
import './rowpost.css'
import { FirebaseContext } from '../store/FirebaseContext'
import { collection, getDocs } from 'firebase/firestore'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';


function RowPost(props) {
  const navigate=useNavigate()

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    focusOnSelect:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

//   const [evt,setEvents]=useState([])
//  const{db}=useContext(FirebaseContext)
//   useEffect(()=>{
// const ref=collection(db,'events')
// getDocs(ref).then((snapshot)=>{
//   const allevents=snapshot.docs.map((docs)=>{
//     return{
//       ...docs.data(),
//       id:docs.id
//     }
    
//   })
  
//   setEvents(allevents)
  
// })

//   })
 


  return (
    
       <div className="main-rowpost">
        <h2 style={{fontWeight:'900',fontSize:'25px'}}>{props.title}</h2>
      <Slider {...settings}>
        {props.evt.map((ev) => (
          <div className="card"  onClick={()=>{navigate('/viewpost',{state:{ev}})}}>
            <div className="card-top">
              <img
                src={
                  ev.url
                }
               
              />
              <h1 style={{marginBottom:'10px'}}>{ev.eventName}</h1>
            </div>
           
          </div>
        ))}
      </Slider>
    </div>
   
  )
}

export default RowPost

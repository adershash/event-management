import React, { useContext, useEffect, useState } from 'react'
import './rowpost.css'
import { FirebaseContext } from '../store/FirebaseContext'
import { collection, getDocs } from 'firebase/firestore'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function RowPost(props) {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    focusOnSelect:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
        <h2>{props.title}</h2>
      <Slider {...settings}>
        {props.evt.map((ev) => (
          <div className="card">
            <div className="card-top">
              <img
                src={
                  ev.url
                }
               
              />
              <h1>{ev.eventName}</h1>
            </div>
           
          </div>
        ))}
      </Slider>
    </div>
   
  )
}

export default RowPost

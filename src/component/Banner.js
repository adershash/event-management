import React from 'react'
import './Banner.css'
import { useContext,useState,useEffect } from 'react'
import { FirebaseContext } from '../store/FirebaseContext'
import { collection,getDocs } from 'firebase/firestore'


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Banner(props) {
  const settings = {
    dots: true,
    infinite:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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
//   const{db}=useContext(FirebaseContext)
//    useEffect(()=>{
//  const ref=collection(db,'events')
//  getDocs(ref).then((snapshot)=>{
//    const allevents=snapshot.docs.map((docs)=>{
//      return{
//        ...docs.data(),
//        id:docs.id
//      }
     
//    })
   
//    setEvents(allevents)
  
   
//  })
 
//    })
  return (
    <div className="main-banner">
        <h2>{props.title}</h2>
      <Slider {...settings}>
        {props.evt.map((ev) => (
          <div className="banner">
            <div className="banner-top">
              <img
                src={
                  ev.url
                }
               
              />
            </div>
           
          </div>
        ))}
      </Slider>
    </div>
    
      

  )
}

export default Banner

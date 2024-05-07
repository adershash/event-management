import React from 'react'
import { useState } from 'react';

function AdminPreview(props) {
  return (
    <div>
        <div className='seat'>
             {/* {console.log( typeof props.noRow)} */}
             {Array(parseInt(props.noRow)).fill(true).map((item, index) => (
              
                 <Button1 id={index} seat={props.r}  details={props.details} ></Button1>
              
          
        ))}
          
        </div>
      
    </div>
  )
}


function Button1(props){
         
    
    
  
      const [activeA, setActive1] = useState(false);
      const handleClicked = (index,seat) => {
        
       
  
            
            //seatnos=seatnos.concat(seatno)
           
         
              
              setActive1(!activeA)
              
              
              
              // if(activeA){
              //     props.handleClick(-1,props.r+'-L')
              // }else{
              //     props.handleClick(1,props.r+'-L')
              // }
          
      };
      return(   <button id={props.id} className="seat1"  onClick={() => { handleClicked(props.id,props.seat) }}  style={{backgroundColor: activeA? "#1ea83c" : "white",color:activeA&&'white'}}>{props.seat+(props.id+1)}</button>)
              
  }
  
  export default AdminPreview

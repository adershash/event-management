import React from 'react'
import { BsDisplay } from 'react-icons/bs'

function Table(props) {

    let si=0
    
  return (
    <div className='users9' style={{display:'block'}}>
        <h4>{props.title}</h4>
        
                   
        <div className='tb-section'>
            <table className='table11'>
                <thead>
                            <tr>
                                <th>SI No</th>
                                <th>Event Name</th>
                                <th>User Name</th>
                                <th>Booked At</th>
                                <th>Seat No</th>
                                <th>User ID</th>
                                <th>Ticket NO</th>
                            </tr>
                </thead>
                
                <tbody>
                
                     
                    {props.data.map((ev)=>{
                        
                        si=si+1
                        return(
                
                    <tr>
                        <td>{si}</td>
                        <td>{ev.eventName}</td>
                        <td>{ev.userName}</td>
                        <td>{ev.bookedAt}</td>
                        <td>{ev.seatNumbers}</td>
                        <td>{ev.userid}</td>
                        <td>{ev.ticketno}</td>

                    </tr>
               )}) }
                   
                  
              
                   
                </tbody>
                
                
            </table>
            
        </div>
        
       
    </div>


  )
}

export default Table

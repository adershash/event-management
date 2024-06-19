import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { CiSearch } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import {Route,Routes,useNavigate,BrowserRouter as Router} from 'react-router-dom'
import { AuthContext } from '../store/FirebaseContext';
import {auth} from '../firebase/Config'
import { signOut } from 'firebase/auth';


function Navbar() {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  const [state,setState]=useState(false);
  const[pstate,setpState]=useState(false);
  const handleSignout=(e)=>{
    if(user.displayName==="admin"){
    signOut(auth)
    navigate('/signin')
    }
    else{
    signOut(auth)
    }


  }
  return (
    
   <div className='main' >
  
    <nav className='main-nav'>
      <div className="logo">
        <h2>Event Hub</h2>
      </div>


      <div className={ state ? "mobile-menu-link" : "menu-link"}>
        <ul >
          <li>
            {/* {user.displayName==='admin'? <Link to='/adminhome'>Home</Link>:<Link to='/'>Home</Link> } */}
          </li>
          <li >
            <Link  to="/userbook">Bookings</Link>
          </li>
         
          <li>
            <Link  to="/certificateview">Certificate</Link>
          </li>
          <li>
         {user?null :<button type="button" class="signout-in" id="btnSignup" onClick={()=>navigate('/signup')}>Sign Up</button>}
          </li>
        
          <li >
      {user? <button type="button" class="signout-in" id="btnSignin" onClick={()=>{if(user.displayName==='admin'){signOut(auth);navigate('/signin')}else{signOut(auth)}}}>Sign out</button>:<button type="button" class="signout-in" id="btnSignin" onClick={()=>navigate('/signin')}>Sign In</button>}
   </li>
          
        </ul>
      </div>


      <div className="icons" >
        <ul>
          <li>
          <Link to='/search'>
          <CiSearch fill='black'/>
          </Link>
          </li>

          <li>
            
            <a href="#" onClick={()=>setpState(!pstate)}>
            <MdAccountCircle fill='black'/>
            </a>
          </li>

          

        </ul>
       
      

      </div>

      <div className="hamburger">
      <a href="#" onClick={()=>{setState(!state)}}>
      <RxHamburgerMenu  />
      </a>

      </div>

     

    </nav>
    <div className={pstate?"click-sub-menu-wrap":"sub-menu-wrap"}>
        <div className="sub-menu">
          <div className="user">
            <h3> {user? user.displayName:<span>hi hello</span>}</h3>
          </div>
          
         
          <div className="user-info">
            <Link to='/certificateview'>Certificate</Link>
          </div>
          <div className="user-info">
            <Link to='/' onClick={handleSignout}>SignOut</Link>
          </div>
        </div>
      </div>


      
   </div>
  )
}

export default Navbar

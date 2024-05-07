

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import CreateEvent from './pages/CreateEvent';
import {Route,Routes,useNavigate,BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import {auth} from './firebase/Config'
import { onAuthStateChanged } from 'firebase/auth';
import Search from './pages/Search';
import ViewPost from './pages/ViewPost';
import Tickets from './pages/Tickets';
import Events from './pages/Events';
import CustomSeat from './seat/CustomSeat';
import ViewSeats from './seat/ViewSeats';
import TicketsStage from './pages/TicketsStage';
import UserBook from './pages/UserBook';
import Certificate from './pages/certificate/Certificate';
import CertificateView from './pages/certificate/CertificateView';
import EditData from './pages/EditData';



function App() {

  const {setUser}=useContext(AuthContext)
  const {db}=useContext(FirebaseContext)
  useEffect(()=>{
          onAuthStateChanged(auth,(user)=>{
            setUser(user)
          })
  })
  return (
    <div className="App">
      
   

   


   <Routes>

      <Route element={<Home/>} exact path='/' />
        <Route element={<SignIn/>}  path='/signin'  />
    
        <Route element={<SignUp/>}  path='/signup'  />

        <Route element={<AdminHome/>} path='/adminhome' />      
       <Route element={<CreateEvent/>} path='/createevent'/>
       <Route element={<Search/>} path='/search'></Route>
       <Route element={<ViewPost/>} path='/viewpost'></Route>
       <Route element={<Tickets/>} path='/tickets'></Route>
       <Route element={<Events/>} path='/events'></Route>
       <Route element={<CustomSeat/>} path='/customseat'></Route>
       <Route element={<ViewSeats/>} path='/viewseats'></Route>
       <Route element={<TicketsStage/>} path='/ticketsstage'></Route>
       <Route element={<UserBook/>} path='/userbook'></Route>
       <Route element={<Certificate/>} path='/certificate'></Route>
       <Route element={<CertificateView/>} path='/certificateview'></Route>
       <Route element={<EditData/>} path='/editdata'></Route>
      
        </Routes>

  
     
    </div>
  );
}

export default App;

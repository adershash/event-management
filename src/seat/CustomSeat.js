
import React,{useState,useEffect, useContext} from 'react'
import './CustomClassroom.css'
import AdminView from './Seat';
import { FirebaseContext } from '../store/FirebaseContext';
import { addDoc,collection } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import Seat from './Seat';
import AdminPreview from './AdminPreview';
import Swal from 'sweetalert2';

function CustomSeat(props) {

    const [count,setCount] = useState(0)
    const [seats,setSeats] = useState('')
    const [rows,setRows] = useState('---select---')
    const [index,setIndex] = useState(0)
    const [number,setNumber] = useState(1)
    const [columnvisible,setColumnvisible] = useState(false)
    const [status,setStatus] = useState('false')
    const [norow,setNorow]=useState(0)
    const {db}=useContext(FirebaseContext)
    const {state}=useLocation()
    const navigate=useNavigate()
    

    //array of selected seats
    //let seatarray = seats
    const handleSubmit=(e)=>{

      e.preventDefault()
      if(number&&rows&&norow&&state.docid.evid!=undefined){
        const dbref=collection(db,'seat')
        addDoc(dbref,{rows:number,sections:rows,rseat:norow,eventID:state.docid.evid}).then((res)=>{navigate('/adminhome')}).then(()=>{
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Seats are added",
            showConfirmButton: false,
            timer: 1500
          });

        })
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!all fields are not filled or event has not been created",
          
        });
       
      }



    }
    const handleClick = (num,seat) => {
      setCount(count+num)
      if(num===-1){
        setSeats(seats.replace(' '+seat,''))
      }
      else{
        setSeats(seats+' '+seat)
      }

    };
    const handleOnChange = (e) => {setRows(e.target.value)}
    const handleChange = (e) => {setNumber(e.target.value)}
    const handleChangerow=(e)=>{setNorow(e.target.value)}
    const handleCheck = (e) => { if(e.target.checked){
      setStatus('true')
    }
  }


    useEffect(()=>{
        if(rows==='1'){
            setColumnvisible(true)
            setIndex(1)
        }else if(rows==='2'){
            setColumnvisible(true)
            setIndex(2)
        }else if(rows==='3'){
          setColumnvisible(true)
          setIndex(3)
        }else if(rows==='4'){
          setColumnvisible(true)
          setIndex(4)
        }else{
            setColumnvisible(false)
        }

        if(number==='1'){
            setNumber(1)
        }else if(number==='2'){
            setNumber(2)
        }else if(number==='3'){
            setNumber(3)
        }else if(number==='4'){
            setNumber(4)
        }else if(number==='5'){
            setNumber(5)
        }else if(number==='6'){
            setNumber(6)
        }else if(number==='7'){
            setNumber(7)
        }else if(number==='8'){
            setNumber(8)
        }else if(number==='9'){
          setNumber(9)
        }else if(number==='10'){
          setNumber(10)
        }else if(number==='11'){
          setNumber(11)
        }else if(number==='12'){
          setNumber(12)
        }else{}


})
    //   props.handleData(status,props.ctype,index,number,seats,count) 
  
    return (
      <div>
       
        <form class="form-inline">
              <div className='form-input'>
        <div>
              <label htmlFor="brows" style={{marginTop:'2em'}}>Number of sections : </label>
              <select class="form-control" name="brows" id="brows" value={rows} onChange={handleOnChange}>
                <option value="">-select-</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </div>
           
            <div> 
              <label htmlFor="brnumber" style={{marginTop:'2em'}}>Number of rows </label>
              <select class="form-control" name="brnumber" id="brnumber" value={number} onChange={handleChange}>
                <option value="1">1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select>
            </div>
            <div> 
              <label htmlFor="brnumber" style={{marginTop:'2em'}}>Number of seats in a row </label>
              <select class="form-control" name="brnumber" id="brnumber" value={norow} onChange={handleChangerow}>
                <option value="1">1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select>
              
            </div>
            
            </div>
            <button onClick={handleSubmit} className='seatAdding'>Add </button>
            </form>
        <div className='mainheading'>
        <h5 style={{marginTop:'60px'}}>Stage preview</h5>
        </div>
        <div className='row' id="classroom">
          <div className='=subheading'>
            <h2 style={{color:'#005ce6'}}>{props.ctype}</h2>
          </div>
          {columnvisible && <div className='=h3'>
            <p>select seating availability for the stage</p>
          </div>}
          <div className='desk'>
          <button id="stages"><i className="fa-solid fa-user" > Stage</i></button>
          </div>
          { Array(index).fill(true).map((item,ind)=>(
          <Column1 number={number} r={ind}  handleClick={handleClick} str4={norow}/>))}
          </div>
          <div>
          <div className='selected'>
          <p>seats selected: <strong>{count}</strong></p>
          <p><strong>{seats}</strong></p>
        </div>
        <div style={{textAlign:'center'}}>
            <input class="form-check-input" type='checkbox' name='disabled' id='dis' onChange={handleCheck}/>
          
          </div>
          </div>  
          
         
      </div>
      
    )
    
}

function Column1(props) {

  let c = ''
  if(props.r===0){c='A'}else if(props.r===1){c='B'}else if(props.r===2){c='C'}else{c='D'}
  
    return(
        <div className='column'>
          <h4 style={{textAlign:'center'}}>Section - {c}</h4>
        {Array(props.number).fill(true).map((item, index) => (
          <AdminPreview r={c+''+(index+1)} st1={props.st1} st2={props.st2} st3={props.st3} handleClick={props.handleClick} noRow={props.str4}/>
        
        ))}
        {console.log(props.str4)}
       
      </div>
    )
}

export default CustomSeat
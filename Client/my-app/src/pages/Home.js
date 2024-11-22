import React,{useState} from 'react'
import '../styles/home.css';

function Signup() {
  const [details,setDetails]=useState({
    text:"",
    number:"",
    email:"",
    file:null,
  });
  function handleChange(e){
    if(e.target.type==="file"){
        setDetails((prevValue)=>{
      return{...prevValue, [e.target.name]:e.target.value[0]}});
    }
    else{
      setDetails((prevValue)=>{
      return{...prevValue, [e.target.name]:e.target.value}});
    }
    
  }
  async function handleClick(e){
    e.preventDefault();
    const response=await fetch("http://localhost:8080/details",{
      method:"POST",
      body:JSON.stringify(details),
      headers:{
        "Content-Type":"application/json"}
    })
    const result=await response.json();
    
    console.log(result);
    
  }
  
  return (
    <div className="container">
    <div className="signup" >
    <h1>Details</h1>  
            <form >                          
                <input onChange={handleChange} name='text' type="text" placeholder="Name" value={details.text} />
                <input onChange={handleChange} name='number' type="number" placeholder="Age" value={details.number} />
                <input onChange={handleChange} name='email' type="email" placeholder="Email" value={details.email} />
                <input className='file' onChange={handleChange} name='file' type="file" />
                <button onClick={handleClick}>Submit</button>
            </form>
    </div>
    </div>
  )
}

export default Signup;

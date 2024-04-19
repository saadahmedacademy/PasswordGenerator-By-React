import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const NC = '1234567890';
  const SC = '@#!$%^&*()';
  const UC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LC = 'abcdefghijklmnopqrstuvwxyz';

  const inputRef = useRef(null);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordUpperCase, setPasswordUpperCase] = useState(false);
  const [passwordLowerCase, setPasswordLowerCase] = useState(false);
  const [passwordSpecialCar, setPasswordSpecialCar] = useState(false);
  const [passLength, setPassLength] = useState('');
  const [fpass, setFpass] = useState('');


  const createPassword = () => {
    let charSet = '';
    let showPassword = ''

    if (passwordNumber || passwordUpperCase || passwordLowerCase || passwordSpecialCar) {
      if (passwordNumber) charSet += NC;
      if (passwordUpperCase) charSet += UC;
      if (passwordLowerCase) charSet += LC;
      if (passwordSpecialCar) charSet += SC;

      for (let i = 0; i < passLength; i++) {
        showPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setFpass(showPassword)
      
      inputRef.current.defaultValue = charSet; // Set the input field value using the ref
      toast.success('New password has been generated');
    } else {
      toast.error('Please check at least one checkbox!');
    }
  };

  let copyPass = () =>{
    navigator.clipboard.writeText(fpass);
    toast.info("Password has been copied!")
  }

  return (
    <>
     <div>

    <div className="passwordBox">
      <h3>Password Generator</h3>

      <div className="passwordBoxInput">
      <input type="text" defaultValue={fpass} placeholder='Password' ref={inputRef} /> <button className='copyBtn' onClick={copyPass}>Copy</button>
      </div>

      <div className="passwordlength">
        <label >Password Length:</label>
        <input type="number" placeholder='Enter Length' value={passLength} onChange={(event) => setPassLength(event.target.value)} max={20} min={8} />
      </div>
      

       
      <div className="passwordNumber">
        <label >Include Number:</label>
        <input type="checkbox" checked={passwordNumber} onChange={() => setPasswordNumber(!passwordNumber)} />
      </div>
      
      <div className="passwordUpperCase">
        <label >Include UpperCase:</label>
      <input type="checkbox" checked={passwordUpperCase} onChange={() => setPasswordUpperCase(!passwordUpperCase)} />
      </div>

      <div className="passwordLowerCase">
        <label >Include LowerCase:</label>
        <input type="checkbox" checked={passwordLowerCase} onChange={() => setPasswordLowerCase(!passwordLowerCase)} />
      </div>

      
      <div className="passwordSpecialCar">
        <label >Include Special Cherecter:</label>
        <input type="checkbox" checked={passwordSpecialCar} onChange={() => setPasswordSpecialCar(!passwordSpecialCar)}  />
      </div>

      <div >
        <button onClick={createPassword} className='generateBtn'>Generate Password</button>
      </div>
    </div>
     </div>
     <ToastContainer />
    </>
  )
}

export default App
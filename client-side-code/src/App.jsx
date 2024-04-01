import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { abiCode } from './abi'
import { AccountResgitration } from './Payment'
import { Admin } from './Admin'

function App() {
  const [web3, setWeb3] = useState(null);
  const [courseContract, setcourseContract] = useState(null);
  const [courseFee, setcourseFee] = useState('');
  const contractAdress = '0xe3581ee615ac7975d9829af99fb8a4210b22a918';
  
  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(() => {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

          const paymentInstance = new web3Instance.eth.Contract(abiCode, contractAdress);
          setcourseContract(paymentInstance);

          paymentInstance.methods.courseFee().call()
            .then(fee =>{
              setcourseFee(web3Instance.utils.fromWei(fee, 'ether'));
            });

      }).catch((err)=>{
        console.log(err);
      })
    } else {
      alert("please install the wallet");
    }
  },[]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path ="/" index element = {<AccountResgitration web3={web3} courseContract={courseContract} courseFee={courseFee}/>}/>
          <Route path = "/admin" element = {<Admin web3={web3} courseContract={courseContract} courseFee={courseFee}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App

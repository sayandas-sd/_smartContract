import { useState } from "react";
import { useEffect } from "react"


export const Admin = ({web3, courseContract})=> {

    const [payments, setPayments] = useState([]);

    const pay = ()=> {
        if(!web3 || !courseContract) return;

        console.log(courseContract.methods.payments);
        
        courseContract.methods.getAllPayments().call()
            .then(values =>{
                setPayments(values)
            });
    }

    useEffect(()=>{
        if(web3 && courseContract){
            pay();
        }
    },[web3, courseContract]);


    return (
        <div style = {{
            border: '4px solid black',
            padding: '100px',
            backgroundColor: '#3e4a61',
            borderRadius: '10px'}}>
            <h1>Transactions</h1>    
            <h2>Admin</h2>
            <h3>Total {payments.length} people payment history</h3>
            <h4>{payments.map(payment => (
                <div key = {payment.email} >
                    <p>Email: {payment.email} </p>
                </div>    
            ))}</h4>
        </div>
    )
}
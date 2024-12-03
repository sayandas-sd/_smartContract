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
            <h1 className="text-8xl text-amber-100">Transactions</h1>    
            
            <h3 className="text-3xl m-6 underline underline-offset-4 text-amber-200">Total {payments.length} people payment history:</h3>
            <h4 className="text-2xl ">{payments.map(payment => (
                <div key = {payment.email} >
                    <p className="mt-2">Email: {payment.email} </p>
                </div>    
            ))}</h4>
        </div>
    )
}
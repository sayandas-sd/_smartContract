import { useState } from "react";

export const AccountResgitration = ({web3, courseContract, courseFee})=> {
    const [email, setEmail] = useState('');

        const paymentForFee = async () => {
            if (!web3 || !courseContract) return;

        //when person press the then trigger then get their all metamusk account
        const accounts = await web3.eth.getAccounts();

        //this will show my first sayan@gmail.com account bcz of a account[0]
        courseContract.methods.payForCourse(email).send({ from: accounts[0], value: web3.utils.toWei(courseFee, 'ether') })
            .on('transactionHash', hash => {
                console.log('Transaction hash:', hash);
            })
            .on('receipt', receipt => {
                console.log('Transaction successful:', receipt);
            })
            .on('error', error => {
                console.error('Error:', error);
            });
        }
        
    
    return (
        <div style = {{
            border: '4px solid black',
            padding: '90px',
            backgroundColor: '#3e4a61',
            borderRadius: '10px'
        }}>
            <br />
            
            <h1>Payment Here</h1>
            <h2>Payment Fee: {courseFee} ETH</h2>
            <input type="text" placeholder="Email" value = {email} 
            onChange={e => setEmail(e.target.value)}
            style = {{
                width: '200px', height: '30px',
                color: 'black', backgroundColor: 'white',
                borderRadius: '10px', fontSize: '20px'
            }}
            />
            <br />
            <br />
            <button onClick={paymentForFee}>Pay Now</button>
        </div>
    );
};
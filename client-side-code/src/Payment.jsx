import { useEffect, useState } from "react";

export const AccountResgitration = ({web3, courseContract, courseFee})=> {
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const loadAccount = async () => {
            if (!web3) return;

            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);

                // Fetch the balance of the first account
                const balanceWei = await web3.eth.getBalance(accounts[0]);
                const balanceEth = web3.utils.fromWei(balanceWei, "ether");
                setBalance(parseFloat(balanceEth).toFixed(4));
            } else {
                console.warn("No accounts found. Please connect MetaMask.");
            }
        };

        loadAccount();
    }, [web3]);


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
            padding: '100px',
            backgroundColor: '#243643',
            borderRadius: '10px'
        }}>
            <br />
            
            <h1 className="text-red-500 font-bold mb-10 text-8xl">Payment Page</h1>
            <h2 className="text-3xl my-10">Fee: {courseFee} ETH</h2>
            {account && <h2 className="text-2xl font-bold">Account Address: {account}</h2>}
            {balance !== null && <h2 className="text-xl font-bold m-5 text-2xl">Balance: {balance} ETH</h2>}
            <input 
            type="text" 
            placeholder="Email" 
            value = {email} 
            onChange={e => setEmail(e.target.value)}
            style = {{
                width: '250px', 
                height: '30px',
                color: 'black', 
                backgroundColor: 'white',
                borderRadius: '10px', 
                fontSize: '20px'
            }}
            className="placeholder:text-gray-500 pl-[100px]"/>
            <br />
            <br />
            <button onClick={paymentForFee} className="font-bold text-lg">Pay Now</button>
        </div>
    );
};
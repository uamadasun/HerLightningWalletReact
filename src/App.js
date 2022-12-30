import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Transactions from "./components/Transactions";
import Buttons from "./components/Buttons";
import Chart from "./components/Chart";




const API_KEY = process.env.REACT_APP_API_KEY

  
  function App() {
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState(null);

  
  const getPrice = () => {
     // Axios is a library that makes it easy to make http requests
     // After we make a request, we can use the .then() method to handle the response asynchronously
     // This is an alternative to using async/await
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
       // promise that will run when the API call is successful
      .then((res) => {
        setPrice(res.data.data.amount);
        updateChartData(res.data.data.amount);
      })
       // promise that will run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  };


const getWalletBalance = () => {
  const headers = {
    "X-Api-Key": API_KEY,
  };
  axios
    .get("https://legend.lnbits.com/api/v1/wallet", { headers })
    .then((res) => {
      // Divide our balance by 1000 since it is denominated in millisats
      setBalance(res.data.balance / 1000);
    })
    .catch((err) => console.log(err));
};

const updateChartData = (currentPrice) => {
  const timestamp = Date.now();
     // We are able to grab the previous state to look at it and do logic before adding new data to it
  setChartData((prevState) => {
    // If we have no previous state, create a new array with the new price data
    if (!prevState)
      return [
        {
          x: timestamp,
          y: Number(currentPrice),
        },
      ];
    // If the timestamp or price has not changed, we don't want to add a new point
    if (
      prevState[prevState.length - 1].x === timestamp ||
      prevState[prevState.length - 1].y === Number(currentPrice)
    )
      return prevState;
    // If we have previous state than keep it and add the new price data to the end of the array
    return [
      // Here we use the "spread operator" to copy the previous state
      ...prevState,
      {
        x: timestamp,
        y: Number(currentPrice),
      },
    ];
  });
};



const getTransactions = () => {
  const headers = {
    "X-Api-Key": API_KEY,
  };
  axios
    .get("https://legend.lnbits.com/api/v1/payments", { headers })
    .then((res) => {
      setTransactions(res.data);
    })
    .catch((err) => console.log(err));
};


  
   // useEffect is a 'hook' or special function that will run code based on a trigger
   // The brackets hold the trigger that determines when the code inside of useEffect will run
   // Since it is empty [] that means this code will run once on page load
  useEffect(() => {
    getPrice();
    getWalletBalance();
    getTransactions();
  }, []);

  // Run these functions every 5 seconds after initial page load
  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
      getWalletBalance();
      getTransactions();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

    
  
  
  return (
    <div className="App">
      <header>
        <h1>her lightning wallet</h1>
      </header>
      <Buttons />
      <div className="row">
        <div className="balance-card">
          <h2>Balance</h2>
          <p>{balance} sats</p>
        </div>
        <div className="balance-card">
          <h2>Price</h2>
          <p>${price}</p>
        </div>
      </div>
      <div className="row">
        <div className="row-item">
          <Transactions transactions={transactions} />
        </div>
        <div className="row-item">
          <Chart chartData={chartData} />
        </div>
      </div>
      <footer>
        <p>Lightning her way.</p>
      </footer>
    </div>
  );
}

export default App;
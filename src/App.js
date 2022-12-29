import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

  
  function App() {
  const [price, setPrice] = useState(null);
  
  const getPrice = () => {
     // Axios is a library that makes it easy to make http requests
     // After we make a request, we can use the .then() method to handle the response asynchronously
     // This is an alternative to using async/await
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
       // promise that will run when the API call is successful
      .then((res) => {
        setPrice(res.data.data.amount);
      })
       // promise that will run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  };
  
   // useEffect is a 'hook' or special function that will run code based on a trigger
   // The brackets hold the trigger that determines when the code inside of useEffect will run
   // Since it is empty [] that means this code will run once on page load
  useEffect(() => {
    getPrice();
  }, []);
  
  
  return (
    <div className="App">
      <header>
        <h1>her lightning wallet</h1>
      </header>
      {/* <Buttons /> */}
      <div className="row">
        <div className="balance-card">
          <h2>Balance</h2>
          {/* <p>{balance} sats</p> */}
        </div>
        <div className="balance-card">
          <h2>Price</h2>
          <p>${price}</p>
        </div>
      </div>
      <div className="row">
        <div className="row-item">
          {/* <Transactions transactions={transactions} /> */}
        </div>
        <div className="row-item">{/* <Chart chartData={chartData} /> */}</div>
      </div>
      <footer>
        <p>Lightning her way.</p>
      </footer>
    </div>
  );
}

export default App;
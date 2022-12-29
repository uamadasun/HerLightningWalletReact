import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";


function App() {
  //function to get us price of btc
  const [price, setPrice] = useState(0);

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      
      //runs if API is called successfully
      .then((res) => {
        setPrice(res.data.data.amount);
      })

      //runs should API call fail
      .catch((err) => {
        console.log(err);
      });
  }
  
  //hook, lets us run the function at a specific time
  useEffect(() => {
    getPrice();
  }, []);

  return (
    <div className="App">
      <h1>Current Bitcoin Price</h1>
      <h3>${price}</h3>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import { get } from 'aws-amplify/api';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react'
import './App.css'

function App() {  
const { signOut } = useAuthenticator()

// Create coins variable and set an empty array
const [coins, setCoins] = useState([])

// Call fetchCoins function when component loads
useEffect(() => {
  fetchCoins()
}, [])

// API 
async function fetchCoins() {
  try {
    const restOperation = get({
      apiName: 'cryptoapi',
      path: '/coins'
    });
    const { body } = await restOperation.response;
    const json = await body.json();
    setCoins(json.coins);
    console.log('GET call succeeded: ', json);
  } catch(e) {
    console.log('GET call failed: ', JSON.parse(e.response.body));
  }
}

  return (
    <>
     <div className="App">
       <header className="App-header">
        <h1>Hello from AWS Amplify</h1>
      {coins.map((coin, index) => (
          <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>{coin.price_usd}</h5>
          </div>
        ))
      }

        <button onClick={() => signOut()}>Log Out</button>
      </header>
    </div>
    </>
  )
}

export default withAuthenticator(App)

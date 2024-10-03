import { useEffect, useState } from 'react'
import { get } from 'aws-amplify/api';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react'
import './App.css'

function App() {
  const { signOut } = useAuthenticator()

  // Create coins variable and set an empty array
  const [coins, setCoins] = useState([])

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  // API 
  // async function fetchCoins() {
  //   try {
  //     const restOperation = get({
  //       apiName: 'cryptoapi',
  //       path: '/coins'
  //     });
  //     const { body } = await restOperation.response;
  //     const json = await body.json();
  //     setCoins(json.coins);
  //     console.log('GET call succeeded: ', json);
  //   } catch(e) {
  //     console.log('GET call failed: ', JSON.parse(e.response.body));
  //   }
  // }

  async function fetchCoins() {
    const { limit, start } = input
    try {
      const restOperation = get({
        apiName: 'cryptoapi',
        path: `/coins?limit=${limit}&start=${start - 1}`
      })
      const { body } = await restOperation.response;
      const json = await body.json();
      setCoins(json.coins);
    } catch (e) {
      console.log('GET call failed: ', JSON.parse(e.response))
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Hello from AWS Amplify</h1>
          <br />
          {coins.map((coin, index) => (
            <div key={index}>
              <div className='crypto-row'>
                <h2>Name: {coin.name} - {coin.symbol}</h2>
                <h2>Price: {coin.price_usd}</h2>
              </div>
            </div>
          ))
          }
          <input type="limit" placeholder="limit"
            onChange={e => updateInputValues('limit', e.target.value)} />
          <input type="start" placeholder="rank"
            onChange={e => updateInputValues('start', e.target.value)} />
          <button onClick={fetchCoins}>Fetch Coins</button>
          <button onClick={() => signOut()}>Log Out</button>
        </header>
      </div>
    </>
  )
}

export default withAuthenticator(App)

import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react'
import './App.css'


function App() {
const { signOut } = useAuthenticator()
  return (
    <>
     <div className="App">
       <header className="App-header">
        <h1>Hello from AWS Amplify</h1>
        <button onClick={() => signOut()}>Log Out</button>
      </header>
    </div
    </>
  )
}

export default withAuthenticator(App)

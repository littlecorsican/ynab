import logo from './logo.svg';
import { useState, useEffect } from 'react'
import { accounts } from '../enums/accounts';

function App() {

  const [amount, setAmount ] = useState(0)
  const [category, setCategory ] = useState(null)
//   const [amount, setAmount ] = useState(0)
//   const [amount, setAmount ] = useState(0)
//   const [amount, setAmount ] = useState(0)

  return (
    <div className="App">
      <div className="button-bar">
        <button>All</button>
        <button>Underfunded</button>
        <button>Overfunded</button>
        <button>Money Available</button>
      </div>
      <Row />
    </div>
  );
}

export default App;

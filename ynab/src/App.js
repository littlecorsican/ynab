import logo from './logo.svg';
import './App.css';
import Row from './components/row';
import { useState, useEffect } from 'react'


function App() {

  const [accounts, setAccount ] = useState([
    /**
     * account: string
     * date: date
     * payee:
     * category:
     * outflow:
     * inflow:
     */
  ])


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

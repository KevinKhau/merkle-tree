import React from 'react';
import logo from './logo.svg';
import './App.css';
import MerkleTree from "./components/MerkleTree/MerkleTree";

function App() {
    const data = ['Sorare', 'Kevin', 'Blockchain', 'Football'];
    const separator = ' ';

    return (
        <div className="App">
            <input type="text" value={data.join(separator)}/>
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <body>
                <MerkleTree></MerkleTree>
            </body>
        </div>
    );

}

export default App;

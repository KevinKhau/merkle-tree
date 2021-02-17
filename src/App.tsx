import React from 'react';
import './App.css';
// @ts-ignore
import OrganizationChart from '@dabeng/react-orgchart';

function App() {
    const data = ['Sorare', 'Kevin', 'Blockchain', 'Football'];
    const separator = ' ';

    return (
        <div className="App">
            <input type="text" value={data.join(separator)}/>
            <OrganizationChart datasource={data} draggable={true} />
        </div>
    );

}

export default App;

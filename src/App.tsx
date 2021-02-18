import React from 'react';
import './App.css';
// @ts-ignore
import OrganizationChart from '@dabeng/react-orgchart';
import {MerkleTree} from "./Merkle/MerkleTree";
import MerkleNode from "./Merkle/MerkleNode";

function App() {
    const data = ['Sorare', 'Kevin', 'Blockchain', 'Football'];
    const separator = ' ';
    const merkleTree = new MerkleTree(data);

    return (
        <div className="App">
            <input type="text" value={data.join(separator)}/>
            <OrganizationChart datasource={merkleTreeToOrgChart(merkleTree)} parentNodeSymbol={'ez'}
                               draggable={true} pan={true} zoom={true}/>
        </div>
    );

}

function merkleTreeToOrgChart(merkleTree: MerkleTree) {
    let merkleNodeToOrgChartNode1 = merkleNodeToOrgChartNode(merkleTree.root);
    console.log(merkleNodeToOrgChartNode1);
    return merkleNodeToOrgChartNode1;
}

function merkleNodeToOrgChartNode(merkleNode: MerkleNode): any {
    return {
        name: merkleNode.level,
        title: merkleNode.hash,
        children: [merkleNode.left, merkleNode.right].filter(v => !!v).map(node => merkleNodeToOrgChartNode(node as MerkleNode))
    };
}

export default App;

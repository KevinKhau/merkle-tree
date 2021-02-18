import React from 'react';
import './App.css';
// @ts-ignore
import OrganizationChart from '@dabeng/react-orgchart';
import {MerkleTree} from "./Merkle/MerkleTree";
import MerkleNode from "./Merkle/MerkleNode";

type Props = {

};
type State = {
    data: string;
    merkleTree: MerkleTree;
    datasource: object;
};
class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        const data = 'Sorare Kevin Blockchain Football';
        const merkleTree = new MerkleTree(data.split(' '));
        this.state = {
            data,
            merkleTree,
            datasource: merkleTreeToOrgChart(merkleTree)
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="App">
                <input type="text" defaultValue={this.state.data} onChange={e => this.handleChange(e)}/>
                <input type="button" value="Create Tree" onClick={this.handleClick}/>
                <OrganizationChart datasource={this.state.datasource}
                                   draggable={true} pan={true} zoom={true}/>
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({data: e.target.value})
    }

    handleClick() {
        this.setState({
            datasource: merkleTreeToOrgChart(new MerkleTree(this.state.data.split(' ')))
        });
    }

}

function merkleTreeToOrgChart(merkleTree: MerkleTree) {
    let merkleNodeToOrgChartNode1 = merkleNodeToOrgChartNode(merkleTree.root);
    console.log(merkleNodeToOrgChartNode1);
    return merkleNodeToOrgChartNode1;
}

function merkleNodeToOrgChartNode(merkleNode: MerkleNode): any {
    return {
        name: merkleNode.hash,
        title: merkleNode.data,
        children: [merkleNode.left, merkleNode.right].filter(v => !!v).map(node => merkleNodeToOrgChartNode(node as MerkleNode))
    };
}

export default App;

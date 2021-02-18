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
        const merkleTree = new MerkleTree(this.format(data));
        this.state = {
            data,
            merkleTree,
            datasource: this.merkleTreeToOrgChart(merkleTree)
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
            datasource: this.merkleTreeToOrgChart(new MerkleTree(this.format(this.state.data)))
        });
    }

    format = (str: string) => str.trim().split(/\s+/);

    merkleTreeToOrgChart(merkleTree: MerkleTree) {
        return this.merkleNodeToOrgChartNode(merkleTree.root);
    }

    merkleNodeToOrgChartNode(merkleNode: MerkleNode): any {
        return {
            name: merkleNode.hash,
            title: merkleNode.data,
            children: [merkleNode.left, merkleNode.right].filter(v => !!v).map(node => this.merkleNodeToOrgChartNode(node as MerkleNode))
        };
    }

}

export default App;

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
    selectedChartNode: MerkleNode;
};
class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        const data = 'Sorare Kevin Blockchain Football';
        const merkleTree = new MerkleTree(this.format(data));
        const datasource = this.merkleTreeToOrgChart(merkleTree);
        this.state = {
            data,
            merkleTree,
            datasource,
            selectedChartNode: datasource
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setSelectedNode = this.setSelectedNode.bind(this);
    }

    render() {
        return (
            <div className="App">
                <input type="text" defaultValue={this.state.data} onChange={e => this.handleChange(e)}/>
                <input type="button" value="Create Tree" onClick={this.handleClick}/>
                <OrganizationChart datasource={this.state.datasource}
                                   draggable={true} pan={true} zoom={true}
                                   onClickNode={this.setSelectedNode}/>
               <div className="tree-details">
                   <p className="height">Tree Height: {this.state.merkleTree.height()}</p>
                   <p className="level">Level {this.state.selectedChartNode.level}: {this.state.merkleTree.level(this.state.selectedChartNode.level)}</p>
               </div>
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({data: e.target.value})
    }

    handleClick() {
        const merkleTree = new MerkleTree(this.format(this.state.data));
        const datasource = this.merkleTreeToOrgChart(merkleTree);
        this.setState({
            merkleTree,
            datasource,
            selectedChartNode: datasource
        });
    }

    setSelectedNode(node: MerkleNode) {
        this.setState({selectedChartNode: node});
    }

    format = (str: string) => str.trim().split(/\s+/);

    merkleTreeToOrgChart(merkleTree: MerkleTree) {
        return this.merkleNodeToOrgChartNode(merkleTree.root);
    }

    merkleNodeToOrgChartNode(merkleNode: MerkleNode): any {
        return {
            id: merkleNode.hash,
            name: merkleNode.hash,
            title: merkleNode.data,
            level: merkleNode.level,
            children: [merkleNode.left, merkleNode.right].filter(v => !!v).map(node => this.merkleNodeToOrgChartNode(node as MerkleNode))
        };
    }

}

export default App;

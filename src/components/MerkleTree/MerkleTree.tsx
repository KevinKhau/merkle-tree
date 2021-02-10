import React from 'react';
import styles from './MerkleTree.module.css';
import MerkleNode from "../MerkleNode/MerkleNode";

class MerkleTree extends React.Component {
    constructor(props: {data: string[]}) {
        super(props);
        this.createMerkleTree(props.data);
    }

    createMerkleTree(data: string[]) {

    }

    buildMerkleTree(nodes: MerkleNode[]): void {

    }

    render() {
        return <div></div>;
    }
}

export default MerkleTree;

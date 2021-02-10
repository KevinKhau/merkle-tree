import React from 'react';
import MerkleNode from "../MerkleNode/MerkleNode";
import {MerkleTreeInterface} from "./MerkleTreeInterface";

type Props = {
    data: string[]
};
type State = {
    root: MerkleNode;
    nodes: MerkleNode[];
    leaves: MerkleNode[];
};
class MerkleTree extends React.Component<Props, State> implements MerkleTreeInterface {
    constructor(props: {data: string[]}) {
        super(props);
        this.createMerkleTree(props.data);
    }

    buildMerkleTree(nodes: MerkleNode[]): void {

    }

    render() {
        return <div>
            {this.props.data}
        </div>;
    }

    createMerkleTree(data: String[]): MerkleTree {
        return undefined;
    }

    height(): number {
        return 0;
    }

    level(index: number): string {
        return "";
    }

    root(): MerkleNode {
        return undefined;
    }
}

export default MerkleTree;

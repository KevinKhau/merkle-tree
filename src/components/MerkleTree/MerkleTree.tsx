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
export class MerkleTree extends React.Component<Props, State> implements MerkleTreeInterface {
    constructor(props: Props) {
        super(props);
        this.state = {
            root: null as any,
            nodes: [],
            leaves: [],
        }
    }

    render() {
        return <div>
            {
                this.state.nodes
                    .filter(node => node.state)
                    .map(node => (
                            <MerkleNode hash={node.state.hash} left={node.state.left} right={node.state.right}/>
                        ))
            }
        </div>;
    }

    componentDidMount() {
        this.createMerkleTree(this.props.data);
    }

    createMerkleTree(data: String[]): MerkleTree {
        const leaves = data.map(str => new MerkleNode({data: str as string}));
        this.setState({leaves});
        this.buildMerkleTree(leaves)
        return this;
    }

    buildMerkleTree(nodes: MerkleNode[]): void {
        if (nodes.length === 1) {
            this.setState({
                nodes: this.state.nodes.concat(...nodes),
                root: nodes[0]
            }, () => console.log(this.state));
            return;
        }

        const parents: MerkleNode[] = [];
        let elevateLastNode = false;
        for (let i = 0; i < nodes.length; i += 2) {
            if (i + 1 < nodes.length) {
                parents.push(new MerkleNode({left: nodes[0], right: nodes[i + 1]})); // new node
            } else {
                elevateLastNode = true;
            }
        }
        this.setState({nodes: this.state.nodes.concat(elevateLastNode ? nodes.slice(0, -1) : nodes)},
            () => {
                if (elevateLastNode) {
                    parents.push(nodes[nodes.length - 1]);
                }
                this.buildMerkleTree(parents)
            });
    }

    root(): MerkleNode {
        return this.state.root;
    }

    height(): number {
        return Math.ceil(Math.log(this.state.leaves.length) / Math.log(2));
    }

    level(index: number): string {
        return "";
    }

}


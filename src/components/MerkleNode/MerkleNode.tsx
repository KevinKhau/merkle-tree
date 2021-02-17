import React from 'react';

type Props = {
    data?: string;
    hash?: string;
    left?: MerkleNode;
    right?: MerkleNode;
};
type State = {
    left?: MerkleNode;
    right?: MerkleNode;
    hash: string;
};
class MerkleNode extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        if (props.hash) {
            this.state = {hash: props.hash}
        } else if (props.data) {
            this.state = {hash: this.hash(props.data)}
        } else if (props.left && props.right) {
            this.state = {
                left: props.left,
                right: props.right,
                hash: this.hash(this.concatenate(props.left.state.hash, props.right.state.hash))
            }
        }
    }

    concatenate(hash1: string, hash2: string): string {
        return  hash1 + hash2;
    }

    hash(message: string) {
        const crypto = require('crypto');

        // hash the message
        const hash = crypto.createHash('sha256').update(message).digest('base64');

        return hash;
    }

    render() {
        return <p>{this.state?.hash}</p>;
    }
}

export default MerkleNode;

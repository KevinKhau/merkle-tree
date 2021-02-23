import React from 'react';

type Props = {
    data?: string;
    left?: MerkleNode;
    right?: MerkleNode;
    level: number;
};

class MerkleNode {

    left?: MerkleNode;
    right?: MerkleNode;
    hash: string;
    level = -1;
    /**
     * For demonstrative purpose. Storing data makes the hashing useless.
     */
    data: string;

    constructor(props: Props) {
        this.level = props.level;
        if (props.data) {
            this.data = props.data;
            this.hash = this.applyHash(this.data);
        } else if (props.left && props.right) {
            this.left = props.left;
            this.right = props.right;
            this.data = this.concatenate(props.left.hash, props.right.hash)
            this.hash = this.applyHash(this.data);
        } else {
            throw new Error("Expected Arguments: `data` or `left and right`");
        }
    }

    concatenate(hash1: string, hash2: string): string {
        return hash1 + hash2;
    }

    applyHash(message: string) {
        const crypto = require('crypto');

        // hash the message
        return crypto.createHash('sha256').update(message).digest('base64');
    }

}

export default MerkleNode;

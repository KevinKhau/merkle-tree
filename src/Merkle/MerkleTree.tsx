import React from 'react';
import MerkleNode from "./MerkleNode";
import {MerkleTreeInterface} from "./MerkleTreeInterface";

export class MerkleTree implements MerkleTreeInterface {
    root!: MerkleNode;
    nodes: MerkleNode[] = [];
    leaves: MerkleNode[] = [];

    constructor(data: string[]) {
        this.createMerkleTree(data);
    }

    createMerkleTree(data: string[]): MerkleTree {
        if (data == null || data.length == 0) {
            throw new Error("Input data must have one or more items.");
        }
        const height = this.height(data.length);
        this.leaves = data.map(str => new MerkleNode({data: str, level: height}))
        this.buildMerkleTree(this.leaves, height);
        return this;
    }

    buildMerkleTree(nodes: MerkleNode[], level: number): void {
        if (nodes.length === 1) {
            this.nodes.push(...nodes);
            this.root = nodes[0];
            return;
        }

        const parents: MerkleNode[] = [];
        for (let i = 0; i < nodes.length; i += 2) {
            if (i + 1 < nodes.length) {
                this.nodes.push(nodes[i], nodes[i + 1]);
                parents.push(new MerkleNode({left: nodes[i], right: nodes[i + 1], level: level - 1})); // new node
            } else {
                parents.push(nodes[i]); // last node elevated to higher level
            }
        }
        this.buildMerkleTree(parents, --level);
    }

    height(nbLeaves?: number): number {
        // Constant implementation using binary tree properties
        return Math.ceil(Math.log(nbLeaves ?? this.leaves.length) / Math.log(2));
    }

    level(index: number): string[] {
        const height = this.height();
        if (index > height) {
            throw new Error("Input index incorrect. Expected: less or equal to " + height + ".");
        }
        return this.nodes.filter(node => node.level === index).map(node => node.hash);
    }

}


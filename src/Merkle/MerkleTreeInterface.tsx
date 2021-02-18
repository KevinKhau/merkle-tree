import MerkleNode from "./MerkleNode";
import {MerkleTree} from "./MerkleTree";

export interface MerkleTreeInterface {
    createMerkleTree(data: String[]): MerkleTree;

    // Returns the Merkle root of the tree
    root: MerkleNode;

    /**
     * Merkel root level is 0, thus in the given example height is 2.
     *
     * @return number of levels of the tree
     */
    height(): number;

    /**
     * Returns an Array containing the hashes of the given level
     */
    level(index: number): string[];
}
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {MerkleTree} from './MerkleTree';
import MerkleNode from "./MerkleNode";

const niceMatch = ['Sorare', 'Kevin', 'Blockchain', 'Football']

const fourLeafTree = new MerkleTree(niceMatch);

const oneLeafTree = new MerkleTree(["https://kevinkhau.github.io/polygons/index.html"]);
const twoLeafTree = new MerkleTree(["Satoshi Sakamoto", "Bitcoin"]);
const threeLeafTree = new MerkleTree(["Model", "View", "Controller"]);
const fiveLeafTree = new MerkleTree(["PSOne", "PS2", "PS3", "PS4", "PS5"]);
const twentySevenLeafTree = new MerkleTree(Array.from(Array(27).keys()).map(i => i.toString()));

const node00 = new MerkleNode({data: 'Sorare', level: 2});
const node01 = new MerkleNode({data: 'Kevin', level: 2});
const node10 = new MerkleNode({data: 'Blockchain', level: 2});
const node11 = new MerkleNode({data: 'Football', level: 2});
const node0 = new MerkleNode({left: node00, right: node01, level: 1});
const node1 = new MerkleNode({left: node10, right: node11, level: 1});
const root = new MerkleNode({left: node0, right: node1, level: 0});

describe('givenEmpty_whenCreateMerkleTree_thenException', () => {
    expect(() => new MerkleTree([])).toThrow("Input data must have one or more items.");
});

describe('givenFourLeafTree_whenCreateMerkleTree_then', () => {
  test('it should have 4 leaves', () => expect(fourLeafTree.leaves.length).toEqual(4));
  test('it should have same leaves', () => expect(fourLeafTree.leaves).toEqual([node00, node01, node10, node11]));
  test('it should have 7 nodes', () => expect(fourLeafTree.nodes.length).toEqual(7));
  test('it should have same root', () => expect(fourLeafTree.root).toEqual(root));
  test('root hash should be equal', () => expect(fourLeafTree.root.hash).toEqual(root.hash));
})

describe('givenFourLeafTree_whenRoot_then', () => {
  test('same root', () => expect(fourLeafTree.root).toEqual(root));
  test('same root hash', () => expect(fourLeafTree.root.hash).toEqual(root.hash));
});

test('givenFourLeafTree_whenHeight_then2', () => expect(fourLeafTree.height()).toEqual(2));
/* Number of expected nodes : leaves * 2 - 1 */
describe('givenFourLeafTree_whenGetNodeSize_then7', () => expect(fourLeafTree.nodes.length).toEqual(7));
describe('givenOneLeaf_whenGetNodeSize_then1', () => expect(oneLeafTree.nodes.length).toEqual(1));
describe('givenTwoLeaf_whenGetNodeSize_then3', () => expect(twoLeafTree.nodes.length).toEqual(3));
describe('givenThreeLeaf_whenGetNodeSize_then5', () => expect(threeLeafTree.nodes.length).toEqual(5));
describe('givenFiveLeaf_whenGetNodeSize_then9', () => expect(fiveLeafTree.nodes.length).toEqual(9));
describe('givenTwentySevenLeaf_whenGetNodeSize_then53', () => expect( twentySevenLeafTree.nodes.length).toEqual(53));

describe('givenFourLeaf_whenHeight_then2', () =>  expect(fourLeafTree.height()).toEqual(2));
describe('givenOneLeaf_whenHeight_then0', () =>  expect(oneLeafTree.height()).toEqual(0));
describe('givenTwoLeaf_whenHeight_then1', () =>  expect(twoLeafTree.height()).toEqual(1));
describe('givenThreeLeaf_whenHeight_then2', () =>  expect(threeLeafTree.height()).toEqual(2));
describe('givenFiveLeaf_whenHeight_then3', () =>  expect(fiveLeafTree.height()).toEqual(3));
describe('givenTwentySevenLeaf_whenHeight_then5', () =>  expect(twentySevenLeafTree.height()).toEqual(5));

describe('givenFourLeafTree', () => {
  test('whenLevel0_thenRootHash', () => expect(fourLeafTree.level(0)).toEqual([root.hash]));
  test('whenLevel1_thenLevel1Hashes', () => expect(fourLeafTree.level(1)).toEqual([node0.hash, node1.hash]));
  test('whenLevel2_thenLevel2Hashes', () => expect(fourLeafTree.level(2)).toEqual(
      [node00.hash, node01.hash, node10.hash, node11.hash]
  ));
})

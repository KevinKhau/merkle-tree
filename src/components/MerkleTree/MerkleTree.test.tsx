import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {MerkleTree} from './MerkleTree';
import MerkleNode from "../MerkleNode/MerkleNode";
// @ts-ignore
import enzyme, {shallow} from "enzyme";
// @ts-ignore
import Adapter from "enzyme-adapter-react-16";

const niceMatch = ['Sorare', 'Kevin', 'Blockchain', 'Football']

let merkleTree = new MerkleTree({data: niceMatch});
let node00 = new MerkleNode({data: 'Sorare'});
let node01 = new MerkleNode({data: 'Kevin'});
let node10 = new MerkleNode({data: 'Blockchain'});
let node11 = new MerkleNode({data: 'Football'});
let node0 = new MerkleNode({left: node00, right: node01});
let node1 = new MerkleNode({left: node10, right: node11});
let root = new MerkleNode({left: node0, right: node1});

beforeAll(async () => {
  enzyme.configure({ adapter: new Adapter() });
  const getSuccess = jest.fn(() => Promise.resolve('success'));
  const wrapper = shallow(<MerkleTree data={niceMatch} />);
  merkleTree = wrapper.instance();

  return new Promise(resolve => setImmediate(resolve)).then(() => {
    merkleTree = wrapper.instance();
  });

  node00 = new MerkleNode({data: 'Sorare'});
  node01 = new MerkleNode({data: 'Kevin'});
  node10 = new MerkleNode({data: 'Blockchain'});
  node11 = new MerkleNode({data: 'Football'});
  node0 = new MerkleNode({left: node00, right: node01});
  node1 = new MerkleNode({left: node10, right: node11});
  root = new MerkleNode({left: node0, right: node1});
});

describe('givenNiceMatch_whenCreateMerkleTree_then', async () => {
  test('it should have 4 leaves', () => expect(merkleTree.state.leaves.length).toEqual(4));
  test('it should have same leaves', () => expect(merkleTree.state.leaves).toEqual([node00, node01, node10, node11]));
  test('it should have 7 nodes', () => expect(merkleTree.state.nodes.length).toEqual(7));
  test('it should have same root', () => expect(merkleTree.state.root).toEqual(root));
  test('root hash should be equal', () => expect(merkleTree.state.root.state.hash).toEqual(root.state.hash));
})

describe('givenMerkleTree_whenRoot_then', () => {
  test('it should be not null', () => expect(merkleTree.root()).toBeValid());
  test('same root', () => expect(merkleTree.root()).toEqual(root));
  test('same root hash', () => expect(merkleTree.root()).toEqual(root.state.hash));
});

test('givenMerkleTree_whenHeight_then2', () => expect(merkleTree.height()).toEqual(2));

describe('givenMerkleTree', () => {
  test('whenLevel0_thenRootHash', () => expect(merkleTree.level(0)).toEqual(root.state.hash));
  test('whenLevel1_thenLevel1Hashes', () => expect(merkleTree.level(1)).toEqual([node0.state.hash, node1.state.hash]));
  test('whenLevel2_thenLevel2Hashes', () => expect(merkleTree.level(2)).toEqual(
      [node00.state.hash, node01.state.hash, node10.state.hash, node11.state.hash]
  ));
})

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MerkleTree from './MerkleTree';

describe('<MerkleTree />', () => {

  beforeAll(() => {
    const niceMatch = ['Sorare', 'Kevin', 'Blockchain', 'Football'];
    const merkleTree = new MerkleTree({data: niceMatch});
  });

  test('it should mount', () => {
    render(<MerkleTree />);
    const merkleTree = screen.getByTestId('MerkleTree');
    expect(merkleTree).toBeInTheDocument();
  });
});

describe('givenNiceMatch_whenCreateMerkleTree', () => {
  test('')
})
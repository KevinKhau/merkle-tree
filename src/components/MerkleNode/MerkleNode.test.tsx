import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MerkleNode from './MerkleNode';

describe('<MerkleNode />', () => {
  test('it should mount', () => {
    render(<MerkleNode />);
    
    const merkleNode = screen.getByTestId('MerkleNode');

    expect(merkleNode).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
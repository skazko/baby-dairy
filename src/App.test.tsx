import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders today count', () => {
  render(<App />);
  const todayElement = screen.getByText(/Today/i);
  expect(todayElement).toBeInTheDocument();
});

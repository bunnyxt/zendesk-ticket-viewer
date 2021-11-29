import { render, screen } from '@testing-library/react';
import App from './App';

test('title and link rendered', () => {
  render(<App />);
  const header = screen.getByText('Zendesk Ticket Viewer');
  expect(header).toBeInTheDocument();
  const link = screen.getByText('Jinyuan Liu');
  expect(link).toBeInTheDocument();
});

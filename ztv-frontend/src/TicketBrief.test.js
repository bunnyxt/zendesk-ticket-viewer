import { render, screen } from '@testing-library/react';
import TicketBrief from './TicketBrief';

test('ticket brief info displayed', () => {
  const ticket = { subject: 'hello' };
  render(<TicketBrief ticket={ticket} />);
  const content = screen.getByText(ticket.subject);
  expect(content).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import Tickets from './Tickets';

test('all tickets rendered', () => {
  const tickets = [
    { id: 1, subject: 'hello' },
    { id: 2, subject: 'hi' },
    { id: 3, subject: 'hey' },
  ];
  render(<Tickets tickets={tickets} />);
  tickets.forEach(ticket => expect(screen.getByText(ticket.subject)).toBeInTheDocument());
});

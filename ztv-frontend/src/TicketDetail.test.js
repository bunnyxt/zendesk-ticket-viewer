import { render, screen, within } from '@testing-library/react';
import TicketDetail from './TicketDetail';

test('ticket detail info displayed', () => {
  const ticket = {
    created_at: '2021-11-28T23:13:59Z',
    updated_at: '2021-11-28T23:13:59Z',
    status: 'open',
    subject: 'Sample ticket: Meet the ticket',
  };
  render(<TicketDetail ticket={ticket} />);
  const list = screen.getByRole('list');
  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(3);
  expect(screen.getByText(ticket.subject)).toBeInTheDocument();
});

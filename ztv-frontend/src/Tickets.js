import React from 'react';
import TicketBrief from './TicketBrief';

const Tickets = ({ tickets, setSelectedTicket }) => {
  return (
    <div>
      {
        tickets.map(
          ticket => <TicketBrief key={ticket.id} ticket={ticket} setSelectedTicket={setSelectedTicket} />
        )
      }
    </div>
  );
};

export default Tickets;

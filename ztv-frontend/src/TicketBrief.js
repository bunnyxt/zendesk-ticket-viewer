import React from 'react';
import './TicketBrief.css';

const TicketBrief = ({ ticket, setSelectedTicket }) => {
  return (
    <div 
      className='TicketBrief' 
      title={`click to view detail of ticket ${ticket.subject}`} 
      onClick={() => setSelectedTicket(ticket)}
    >
      {ticket.subject}
    </div>
  );
};

export default TicketBrief;

import React from 'react';
import './TicketDetail.css';

const TicketDetail = ({ ticket, setSelectedTicket }) => {

  const formatDate = (date_str) => new Date(date_str).toLocaleString();

  return (
    <div 
      className='TicketDetail' 
    >
      <h3>{ticket.subject}</h3>
      <ul>
        <li>Created at: {formatDate(ticket.created_at)}</li>
        <li>Updated at: {formatDate(ticket.updated_at)}</li>
        <li>Status: {ticket.status}</li>
      </ul>
      <p>{ticket.description}</p>
      <div 
        className='TicketDetailBackButton' 
        onClick={() => setSelectedTicket(null)}
        title='click to back to all tickets'
      >
        Back to all tickets
      </div>
    </div>
  );
};

export default TicketDetail;

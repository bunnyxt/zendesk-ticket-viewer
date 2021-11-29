import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Tickets from './Tickets';
import TicketDetail from './TicketDetail';
import Pagination from './Pagination';

const App = () => {

  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTickets = (page) => {
    setTicketsLoading(true);
    setErrorMessage('');
    // should be set to correspond port, by default this should be 1437
    axios.get(`${process.env.NODE_ENV === 'development' ? `http://localhost:1437` : ''}/api/tickets?page=${page}`)
      .then(response => {
        setPageTotal(Math.ceil(response.data.data.count / 25));
        setTickets(response.data.data.tickets);
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.message} Detail: ${JSON.stringify(error.response.data.data)}`);
      })
      .finally(() => setTicketsLoading(false));
  };

  useEffect(() => {
    fetchTickets(page);
  }, [page]);

  return (
    <div className="App">
      <h1>Zendesk Ticket Viewer</h1>
      <p>by. <a href='https://www.linkedin.com/in/jinyuan-liu/' target='_blank' rel="noreferrer">Jinyuan Liu</a></p>
      {
        selectedTicket 
          ? <TicketDetail ticket={selectedTicket} setSelectedTicket={setSelectedTicket} /> 
          : <>
              {
                errorMessage
                  ? <div className='ErrorMessage'>Oops! Something went wrong... {errorMessage}</div>
                  : ticketsLoading
                    ? <p>Now loading tickets...</p>
                    : <Tickets tickets={tickets} setSelectedTicket={setSelectedTicket} />
              }
              <Pagination page={page} pageTotal={pageTotal} setPage={setPage} />
            </>
      }
    </div>
  );
};

export default App;

import React from 'react';
import './Pagination.css';

const Pagination = ({ page, pageTotal, setPage }) => {
  return (
    <div className='Pagination'>
      {page > 1 ? <span onClick={() => setPage(page - 1)}>Prev</span> : ''}
      Page {page} of {pageTotal}
      {page < pageTotal ? <span onClick={() => setPage(page + 1)}>Next</span> : ''}
    </div>
  )
};

export default Pagination;

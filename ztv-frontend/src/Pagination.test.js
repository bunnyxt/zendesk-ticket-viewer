import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

test('hide prev button when there not exists prev page', () => {
  render(<Pagination page={1} pageTotal={5} />);
  const prevButton = screen.queryByText('Prev')
  expect(prevButton).toBeNull();
});

test('hide next button when there not exists next page', () => {
  render(<Pagination page={5} pageTotal={5} />);
  const nextButton = screen.queryByText('Next')
  expect(nextButton).toBeNull();
});

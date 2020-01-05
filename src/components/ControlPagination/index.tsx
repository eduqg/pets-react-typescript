import React from 'react';

import { ControlPages } from './styles';

interface OwnProps {
  pageBeforeLast: boolean,
  page: number,
  handleChangePage: (newPage: number) => void
}


export default function ControlePagination({
  pageBeforeLast,
  page,
  handleChangePage,
}: OwnProps) {
  return (
    <ControlPages
      grayStart={page === 1 ? '#999' : '#df4658'}
      grayEnd={pageBeforeLast ? '#999' : '#df4658'}
    >
      <button
        type="button"
        className="start"
        onClick={() => handleChangePage(page - 1)}
      >
        {'<'}
      </button>
      <p>{page}</p>
      <button
        type="button"
        className="end"
        onClick={() => handleChangePage(page + 1)}
      >
        {'>'}
      </button>
    </ControlPages>
  );
}

import React from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';

import './styles.scss';

const Paginator = ({ pagesNum, currentPage, callBackUrl, setLoading }) => {

  currentPage = currentPage ? currentPage : 1;
  pagesNum = pagesNum ? pagesNum : 1;

  const drawPaginationLeftButton = () => {
    return (
      <li>
        <a
          onClick={currentPage !== 1 ? () => (callBackUrl(currentPage - 1), setLoading(true)) : undefined}
          className={cx(
            'pagination-controller pagination-previous',
            currentPage === 1 ? 'page-limit' : ''
          )}
        >
          <i className="fas fa-chevron-left fa-lg"></i>
        </a>
      </li>
    );
  };

  const drawPaginationFirstPageButton = () => {
    return (
      <li>
        <a
          onClick={currentPage !== 1 ? () => (callBackUrl(1), setLoading(true)) : undefined}
          className={cx(
            'pagination-link',
            currentPage === 1 ? 'is-current' : ''
          )}
          aria-label="Goto page 1"
        >
          1
        </a>
      </li>
    );
  };

  const drawPaginationEllipsis = () => {
    if (pagesNum >= 5) {
      return (
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
      );
    }
  };

  const drawPaginationMiddleButton = () => {
    if (pagesNum >= 3){
      let numberPage;
      let isSelected;
      if (currentPage === 1 || currentPage === pagesNum){
        numberPage = Math.ceil(pagesNum / 2);
        isSelected = false;
      } else {
        if (pagesNum === 4 && currentPage === 3){
          numberPage = Math.ceil(pagesNum / 2);
          isSelected = false;
        } else {
          numberPage = currentPage;
          isSelected = true;
        }
      }
      return (
        <li>
          <a
            onClick={isSelected ? undefined : () => (callBackUrl(numberPage), setLoading(true))}
            className={cx(
              'pagination-link',
              isSelected ? 'is-current' : '')
            }
            aria-label={`Page ${numberPage}`}
            aria-current="page"
          >
            {numberPage}
          </a>
        </li>
      );
    }
  };

  // Only appears when there are 4 total pages
  const drawPaginationAdditionalMiddleButton = () => {
    if (pagesNum === 4){
      return (
        <li>
          <a
            onClick={currentPage !== 3 ? () => (callBackUrl(3), setLoading(true)) : undefined}
            className={cx(
              'pagination-link',
              currentPage !== 3
                ? ''
                : 'is-current'
            )}
            aria-label={'Page 3'}
            aria-current="page"
          >
            3
          </a>
        </li>
      );
    }
  };

  const drawPaginationLastPageButton = () => {
    if (pagesNum >= 2) {
      return (
        <li>
          <a
            onClick={currentPage !== pagesNum ? () => (callBackUrl(pagesNum), setLoading(true)) : undefined}
            className={cx(
              'pagination-link',
              currentPage === pagesNum ? 'is-current' : ''
            )}
            aria-label={`Goto page ${pagesNum}`}
          >
            {pagesNum}
          </a>
        </li>
      );
    }
  };

  const drawPaginationRightButton = () => {
    return (
      <li>
        <a
          onClick={currentPage !== pagesNum ? () => (callBackUrl(currentPage + 1), setLoading(true)) : undefined}
          className={cx(
            'pagination-controller pagination-next',
            currentPage === pagesNum ? 'page-limit' : ''
          )}
        >
          <i className="fas fa-chevron-right fa-lg"></i>
        </a>
      </li>
    );
  };

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">

        {drawPaginationLeftButton()}

        {drawPaginationFirstPageButton()}

        {drawPaginationEllipsis()}

        {drawPaginationMiddleButton()}

        {drawPaginationAdditionalMiddleButton()}

        {drawPaginationEllipsis()}

        {drawPaginationLastPageButton()}

        {drawPaginationRightButton()}

      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  pagesNum: Proptypes.number,
  currentPage: Proptypes.number,
  callBackUrl: Proptypes.func,
  setLoading: Proptypes.func,
};

export default Paginator;

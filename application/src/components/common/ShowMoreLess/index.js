import React, { useState } from 'react';
import Proptypes from 'prop-types';
import './styles.scss';


const ShowMoreLess = ({ showMoreString, showLessString, data}) => {
  const [readMore, setReadMore] = useState(false);
  const drawData = (items) => {
    return items.map(item => (
      <p key={item}>
        {item}
      </p>
    ));
  };

  const extraContent =
    (
      <div>
        {drawData(data)}
      </div>
    );
  const linkName = readMore ? showLessString : showMoreString ;
  return (
    <div className="ShowMoreLess">
      <a className="read-more-link" onClick={() => {
        setReadMore(!readMore);
      }}
      >
        <h2>
          {linkName}
        </h2>
      </a>
      {readMore && extraContent}
    </div>
  );
};

ShowMoreLess.propTypes = {
  showMoreString: Proptypes.string,
  showLessString: Proptypes.string,
  data: Proptypes.arrayOf(Proptypes.string),
};

export default ShowMoreLess;
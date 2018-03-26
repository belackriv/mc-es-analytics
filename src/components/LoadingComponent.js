import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

const LoadingComponent = (props) => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} pulse size={props.size} />
    </div>
  );
};

export default LoadingComponent;
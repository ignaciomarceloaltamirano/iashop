import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex vh-100">
      <div className="lds-roller m-auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

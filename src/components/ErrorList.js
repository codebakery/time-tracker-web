import React from 'react';

export default ({ errors }) => {
  if (!errors) {
    return null;
  }
  return (
    <ul className="errors">
      {errors.map((error, index) => <li key={index}>{error}</li>)}
    </ul>
  );
};

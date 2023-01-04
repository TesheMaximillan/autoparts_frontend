import React from 'react';
import PropTypes from 'prop-types';

const Navio = ({ data }) => {
  const {
    name, io,
  } = data;

  return (
    <div className='w-full'>
      <div className='flex'>
      {name}
      {io}
      </div>
    </div>
  );
};

Navio.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    io: PropTypes.node.isRequired,
  }).isRequired,
};

export default Navio;

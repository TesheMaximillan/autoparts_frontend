import React from 'react';
import PropTypes from 'prop-types';

const Navio = ({ data }) => {
  const {
    name, io,
  } = data;

  return (
    <div className='w-full'>
      <div className='flex gap-4'>
      <div className='w-72'>{name}</div>
      <div className='w-72'>{io}</div>
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

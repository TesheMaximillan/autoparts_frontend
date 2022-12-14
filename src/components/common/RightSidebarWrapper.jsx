import React, { useRef, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './RightSidebarWrapper.module.scss';

const { container, active } = styles;

const RightSidebarWrapper = ({ children, show, closeSidebar }) => {
  const containerClass = show !== '' ? `${container} ${active}` : container;
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeSidebar('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const toggleBtn = (
    <button type="button" className="cancelBtn" onClick={() => closeSidebar('')}>
      <AiFillCloseCircle />
    </button>
  );

  return (
    <div ref={ref} className={`${containerClass} ${show}`}>
      {toggleBtn}
      {children}
    </div>
  );
};

RightSidebarWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.string.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default RightSidebarWrapper;

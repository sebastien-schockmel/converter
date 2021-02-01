// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
// == Import
import './style.scss';

// == Composant
const Toggler = ({ open, handleOnClick }) => {
  const togglerClassName = open ? 'toggler toggler--open' : 'toggler';
  return (
    <button
      className={togglerClassName}
      type="button"
      onClick={handleOnClick}
    >
      =
    </button>
  );
};

Toggler.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

// == Export
export default Toggler;

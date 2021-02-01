// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import
import './style.scss';

// == Composant
const Header = ({ baseAmount }) => (
  <div className="header">
    <h1 className="header__title">Converter</h1>
    <p className="header__amount">{baseAmount} euro</p>
  </div>
);

Header.propTypes = {
  // baseAmount est un nombre optionnel
  baseAmount: PropTypes.number,
};

Header.defaultProps = {
  // Par défaut, si je ne donne pas la prop baseAmount à Header, elle vaudra 1
  baseAmount: 1,
};

// == Export
export default Header;

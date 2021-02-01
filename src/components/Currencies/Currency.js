// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import

// == Composant
const Currency = ({
  name, rate, setCurrency, selected,
}) => (
  <li
    className={(selected) ? 'currency currency--active' : 'currency'}
    onClick={() => {
      setCurrency(name, rate);
    }}
  >
    {name}
  </li>
);

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  setCurrency: PropTypes.func,
  selected: PropTypes.bool,
};

Currency.defaultProps = {
  // On met une fonction qui ne fait rien pour garder le bon type de setCurrency
  // Et comme ça si on apelle cette prop alors qu'on l'a jamais donnée à Currencies
  // Ca plantera pas, ça fera juste rien du tout
  setCurrency: () => { },
  selected: false,
};
// == Export
export default Currency;

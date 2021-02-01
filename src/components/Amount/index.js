// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
// == Import
import './style.scss';

// == Composant
const Amount = React.memo(({ currency, value }) => (
  <div className="amount">
  {console.log("Amount Render")}

    <p className="amount__value">{value.toFixed(2)}</p>
    <p className="amount__currency">{currency}</p>
  </div>
));

Amount.propTypes = {
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

// == Export
export default Amount;

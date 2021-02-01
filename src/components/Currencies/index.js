// == Import npm
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// == Import
import Currency from './Currency';
import './style.scss';

// == Composant
class Currencies extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.changePageTitle();
  }

  componentDidUpdate() {
    this.changePageTitle();
  }

  componentWillUnmount() {
    this.changePageTitle('Converter');
  }

  changePageTitle = (title = null) => {
    const { selectedCurrencyName } = this.props;
    // Si title est null, on prends ce qu'il y a aprés le ||
    // Sinon le titre de la page vaudra `title`
    document.title = title || (`${selectedCurrencyName} - Converter`);
  }

  render() {
    const {
      currencies,
      search,
      onSearch,
      setCurrency,
      selectedCurrencyName,
    } = this.props;

    return (
      <div className="currencies">
        <input
          className="currencies__search"
          type="text"
          value={search}
          placeholder="Rechercher"
          onChange={onSearch}
        />
        <ul className="currencies__list">
          {currencies.map((currency) => (
            <Currency
              key={currency.name}
              name={currency.name}
              rate={currency.rate}
              setCurrency={setCurrency}
              selected={currency.name === selectedCurrencyName}
            />
          ))}
        </ul>
      </div>
    );
  }
}

Currencies.propTypes = {
  // currencies est un prototype de
  // `TABLEAU DE` `OBJET` qui possède une propriété name qui est un string est qui est obligatoire
  // https://fr.reactjs.org/docs/typechecking-with-proptypes.html#proptypes
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  search: PropTypes.string,
  onSearch: PropTypes.func,
  setCurrency: PropTypes.func,
  selectedCurrencyName: PropTypes.string,
};

Currencies.defaultProps = {
  // On met une fonction qui ne fait rien pour garder le bon type de setCurrency
  // Et comme ça si on apelle cette prop alors qu'on l'a jamais donnée à Currencies
  // Ca plantera pas, ça fera juste rien du tout
  setCurrency: () => { },
  onSearch: () => { },
  search: '',
  selectedCurrencyName: null,
};

// == Export
export default Currencies;

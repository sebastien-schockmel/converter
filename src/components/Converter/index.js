/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
// == Import npm
import React, { Component } from 'react';

// == Import
// Je récupère les données afin de les fournires à mes sous composants
import currenciesData from 'src/data/currencies';

// On importe les composants
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import Toggler from 'src/components/Toggler';

// Puis on inclus la feuille de style ( attention cette fois c'est du sass)
import './styles.scss';

// == Composant
class Converter extends Component {
  constructor(props) {
    super(props);
    // State représente l'état du composant, c'est un objet et il doit être immutable

    // Ici on le déclare dans le constructeur afin de l'initialiser à sa valeur initiale
    // C'est ce qu'on apelle l'initialState
    this.state = {
      open: false,
      baseAmount: 1,
      currency: {
        name: 'Australian Dollar',
        rate: 1.665247,
      },
      search: '',
    };
  }

  componentDidMount() {
    // Je rajoute un event listener pour la touche échape
    // Et je n'oublie pas d'arreter de l'écouter au démontage
    // Je suis obligé d'avoir une fonction de callback nommée pour pouvoir savoir laquelle je ne veux plus écouter
    document.addEventListener('keypress', this.handleEscapeKeyPush);
  }

  componentWillUnmount() {
    // Je supprime l'écoute de l'event déclaré dans le didMount
    document.removeEventListener('keypress', this.handleEscapeKeyPush);
  }

  handleEscapeKeyPush = (e) => {
    // Parceque Echap marche pas sur ma VM
    if (e.key === '$') {
      this.setState({
        open: false,
      });
    }
  }

  setCurrency = (name, rate) => {
    // On déclenche un changement d'état du composant
    this.setState({
      currency: {
        name,
        rate,
      },
    });
  }

  // On pense bien à mettre une fonction à fleche pour hérité du contexte du parent
  // Si on ne le fait pas, this est un nouveau contexte non défini, il vaudra donc undefined, et state sera innacessible.
  // Si ne veux pas utiliser de fonction fléchée, on peut quand même lui donner le contexte avec un bind(this) au moment de sa référence
  handleToggleClick = () => {
    const { open } = this.state;
    // NOOOOOn pas ça ! il faut que le state reste immutable, et ça ne va pas provoquer de nouveau render
    //  this.state.open = false;
    // on peut pas faire ça non plus ça ne modifie pas le state, et ça ne va pas provoquer de nouveau render
    // open = false;
    // On utilise donc la méthode de classe setState
    this.setState({
      open: !open,
    });
  }

  handleSearchInputChange = (event) => {
    this.setState({ search: event.target.value });
  }

  /**
   * Fonction permettant de filtrer les monnaies suivant la recherche effectuée
   * En fait on va filtrer suivant l'état stocké de la recherche
   */
  getFilteredCurrencies = () => {
    // On récupère la valeur de la recherche
    const { search } = this.state;

    // Si search n'est pas renseignée, on renvoie toutes les données directement
    if (search.trim() === '') {
      return currenciesData;
    }

    // Sinon on va aller filtrer la donnée
    return currenciesData.filter((currency) => {
      // On récupère la valeur du nom de la monnaie sans espace
      let currencyName = currency.name.trim();
      // Puis on la met en minuscule pour enlever les problème de casse
      currencyName = currencyName.toLowerCase();
      // On fait la même chose pour le mot à chercher
      const currencyToSearch = search.trim().toLowerCase();
      // Et pour finir on va chercher si ce qu'on chercher est inclu dans chacunes des noms des monnaies
      return currencyName.includes(currencyToSearch);
    });

    // En une seule ligne ça donne ça :
    // currenciesData.filter((currency) => currency.name.trim().toLowerCase().includes(search.trim().toLowerCase()));
  }

  render() {
    const {
      open,
      baseAmount,
      currency,
      search,
    } = this.state;

    // On récupère les currencies filtrées via search
    const filteredCurrencies = this.getFilteredCurrencies();

    return (
      <div className="converter">
        <Header baseAmount={baseAmount} />
        <Toggler open={open} handleOnClick={this.handleToggleClick} />
        {
          open && (
            <Currencies
              selectedCurrencyName={currency.name}
              search={search}
              onSearch={this.handleSearchInputChange}
              setCurrency={this.setCurrency}
              currencies={filteredCurrencies}
            />
          )
        }
        <Amount
          currency={currency.name}
          value={currency.rate * baseAmount}
        />
      </div>
    );
  }
}

// == Export
export default Converter;

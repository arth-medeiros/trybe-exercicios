import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import isFormValid from './components/IsFormValid';
import MapCards from './components/MapCards';
import SearchBar from './components/SearchBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      count: 1,
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      nameSearch: '',
      rareSearch: 'todas',
      trunfoSearch: false,
      deck: [],
      backupDeck: [],
      disable: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { count } = this.state;
    const stateObj = this.state;
    if (prevState.count !== count) {
      if (isFormValid(stateObj) === true) {
        this.setState({
          isSaveButtonDisabled: false,
        });
      } else {
        this.setState({
          isSaveButtonDisabled: true,
        });
      }
    }
  }

  saveCard = (savedCard) => {
    const { deck } = this.state;
    const newArr = deck;
    const arrWithCard = [...newArr, savedCard];
    this.setState({
      deck: arrWithCard,
      backupDeck: arrWithCard,
    });
  };

  submitCard = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const savedCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
    };

    this.saveCard(savedCard);

    if (cardTrunfo) {
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardTrunfo: false,
        cardRare: 'normal',
        hasTrunfo: true,
        isSaveButtonDisabled: true,
      });
    } else {
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardTrunfo: false,
        cardRare: 'normal',
        isSaveButtonDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { id } = target;
    const { count, backupDeck, nameSearch, trunfoSearch } = this.state;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newCount = count + 1;

    if (id === 'trunfoSearch' && !trunfoSearch) {
      const srchArr = backupDeck.filter((card) => card.cardTrunfo === true);
      this.setState({
        [id]: value,
        count: newCount,
        deck: srchArr,
        disable: true,
      });
    } else if (nameSearch) {
      const srchArr = backupDeck.filter((card) => card.cardName.includes(nameSearch));
      this.setState({
        [id]: value,
        count: newCount,
        deck: srchArr,
      });
    } else {
      this.setState({
        [id]: value,
        count: newCount,
        deck: backupDeck,
        disable: false,
      });
    }
  };

  removeCard = ({ target }) => {
    const { deck } = this.state;
    const newDeck = deck;
    const parentKey = target.value;
    const currElement = deck[parentKey];
    newDeck.splice(parentKey, 1);
    if (currElement.cardTrunfo) {
      this.setState({
        deck: newDeck,
        hasTrunfo: false,
      });
    } else {
      this.setState({
        deck: newDeck,
      });
    }
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      nameSearch,
      rareSearch,
      trunfoSearch,
      isSaveButtonDisabled,
      disable,
      deck,
    } = this.state;

    return (
      <main>
        <Form
          onInputChange={ this.handleChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.submitCard }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <SearchBar
          handleChange={ this.handleChange }
          nameSearch={ nameSearch }
          rareSearch={ rareSearch }
          trunfoSearch={ trunfoSearch }
          disable={ disable }
        />
        <div id="deck-of-cards">
          <ul>
            {deck.map((card, index) => (
              <li key={ card.cardName }>
                <MapCards card={ card } index={ index } removeFunc={ this.removeCard } />
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }
}

export default App;

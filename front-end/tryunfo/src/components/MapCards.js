import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class MapCards extends Component {
  render() {
    const { card, removeFunc, index } = this.props;
    return (
      <>
        <Card
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
        />
        <button
          type="button"
          data-testid="delete-button"
          value={ index }
          onClick={ removeFunc }
        >
          Excluir
        </button>
      </>
    );
  }
}

MapCards.propTypes = {
  removeFunc: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  card: PropTypes.shape({
    cardName: PropTypes.string.isRequired,
    cardDescription: PropTypes.string.isRequired,
    cardAttr1: PropTypes.string.isRequired,
    cardAttr2: PropTypes.string.isRequired,
    cardAttr3: PropTypes.string.isRequired,
    cardImage: PropTypes.string.isRequired,
    cardRare: PropTypes.string.isRequired,
    cardTrunfo: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MapCards;

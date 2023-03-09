import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { card } = this.props;
    return (
      <Link
        to={ `/album/${card.collectionId}` }
        data-testid={ `link-to-album-${card.collectionId}` }
      >
        <div id="album-card">
          <img src={ card.artworkUrl100 } alt={ card.collectionName } />
          <h4>{ card.collectionName }</h4>
          <p>{ card.artistName }</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  card: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default AlbumCard;

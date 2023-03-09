import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isFav: false,
      recoveredFavs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      recoveredFavs: await getFavoriteSongs(),
    });
    this.setState({
      loading: false,
    }, this.checkFav);
  }

  checkFav = () => {
    const { element } = this.props;
    const { recoveredFavs } = this.state;
    const checked = recoveredFavs.some((e) => e.trackId === element.trackId);
    if (checked) {
      this.setState({
        isFav: true,
      });
    }
  };

  changeHandler = async () => {
    const { isFav } = this.state;
    const { element, refresh } = this.props;

    if (!isFav) {
      this.setState({
        loading: true,
      });
      await addSong(element);
      this.setState({
        isFav: true,
        loading: false,
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(element);
      this.setState({
        isFav: false,
        loading: false,
      });
      if (refresh) {
        refresh();
      }
    }
  };

  render() {
    const { element } = this.props;
    const { isFav, loading } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div id="music-card">
        <p>{ element.trackName }</p>
        <audio data-testid="audio-component" src={ element.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="fav-input">
          Favorita
          <input
            type="checkbox"
            id="fav-input"
            checked={ isFav }
            data-testid={ `checkbox-music-${element.trackId}` }
            onChange={ this.changeHandler }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  element: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    kind: PropTypes.string,
  }).isRequired,
  refresh: PropTypes.func,
  // loadHandler: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  refresh: false,
};

export default MusicCard;

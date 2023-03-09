import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artistInfo: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const albumObj = await getMusics(id);
    const onlyMusics = albumObj.filter((e) => e.kind === 'song');
    const onlyInfo = albumObj.filter((e) => e.artistName)[0];
    this.setState({
      musicList: onlyMusics,
      artistInfo: onlyInfo,
    });
  }

  render() {
    const { musicList, artistInfo } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div id="album-cover">
          <h2 data-testid="artist-name">{ artistInfo.artistName }</h2>
          <h3 data-testid="album-name">{ artistInfo.collectionName }</h3>
        </div>
        <div id="music-list-container">
          <ul>
            {musicList.map((e) => (
              <li key={ e.trackName }>
                <MusicCard element={ e } />
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(Album);

import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.refreshFavs();
  }

  refreshFavs = async () => {
    this.setState({
      loading: true,
    });
    const tempArr = await getFavoriteSongs();
    this.setState({
      musicList: this.parseInfo(tempArr),
      loading: false,
    });
  };

  parseInfo = (array) => {
    const treatedArr = array.map((e) => {
      e.trackId = parseInt(e.trackId, 10);
      return e;
    });
    return treatedArr;
  };

  render() {
    const { loading, musicList } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <div id="music-list-container">
          <ul>
            {musicList.map((e) => (
              <li key={ e.trackName }>
                <MusicCard element={ e } refresh={ this.refreshFavs } />
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Favorites;

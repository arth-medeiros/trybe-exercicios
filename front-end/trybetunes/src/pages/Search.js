import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      returned: false,
      lastSearch: '',
      srchResults: [],
    };
  }

  valBtn = () => {
    const { searchInput } = this.props;
    const minLength = 2;
    return (searchInput.length < minLength);
  };

  submitSearch = async (event) => {
    event.preventDefault();
    event.target.reset();
    const { searchInput } = this.props;
    this.setState({
      loading: true,
      lastSearch: searchInput,
    });
    this.setState({
      srchResults: await searchAlbumsAPI(searchInput),
    });
    this.setState({
      loading: false,
      returned: true,
    });
  };

  render() {
    const { onInputChange } = this.props;
    const { loading, returned, lastSearch, srchResults } = this.state;

    const regRender = (
      <form onSubmit={ this.submitSearch }>
        <input
          name="search"
          type="text"
          onChange={ onInputChange }
          data-testid="search-artist-input"
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ this.valBtn() }
        >
          Pesquisar

        </button>
      </form>
    );

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : regRender }
        { returned && (
          <h2>{`Resultado de álbuns de: ${lastSearch}`}</h2>
        )}
        { srchResults.length > 0
          ? (
            <ul>
              {srchResults.map((e, i) => (
                <li key={ e.collectionId }>
                  <AlbumCard card={ e } index={ i } />
                </li>))}
            </ul>
          )
          : <h1>Nenhum álbum foi encontrado</h1>}
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default Search;

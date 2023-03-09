import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    const { handleChange, nameSearch, rareSearch, disable, trunfoSearch } = this.props;
    return (
      <div id="searchbar">
        <input
          type="text"
          id="nameSearch"
          data-testid="name-filter"
          onChange={ handleChange }
          value={ nameSearch }
          disabled={ disable }
        />
        <select
          id="rareSearch"
          data-testid="rare-filter"
          value={ rareSearch }
          onChange={ handleChange }
          disabled={ disable }
        >
          <option value="todas">Todas</option>
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>
        <input
          type="checkbox"
          id="trunfoSearch"
          data-testid="trunfo-filter"
          checked={ trunfoSearch }
          onChange={ handleChange }
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  nameSearch: PropTypes.string.isRequired,
  rareSearch: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  trunfoSearch: PropTypes.bool.isRequired,
};

export default SearchBar;

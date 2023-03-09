import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { infos, func } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="category"
          placeholder="Botao"
          onClick={ () => func(infos.id) }
        >
          {`${infos.name}`}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  infos: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  func: PropTypes.func.isRequired,
};

export default Button;

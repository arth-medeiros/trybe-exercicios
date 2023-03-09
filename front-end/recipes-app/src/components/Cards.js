import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Share from './Share';
import '../styles/Cards.css';

function Cards(props) {
  const {
    image,
    name,
    nationality,
    category,
    type,
    alcohol,
    index,
    id,
  } = props;

  const { faveRecipes, setFaveRecipes, wasShared } = useContext(AppContext);
  // const [wasShared, setWasShared] = useState(false); // usar para construir ternário com msg "Link copied!"

  // const handleShare = ({ target }) => {
  //   const recipeID = target.name;
  //   const recipeType = target.value;

  //   if (recipeType === 'meal') {
  //     copy(`http://localhost:3000/meals/${recipeID}`);
  //     setWasShared(true);
  //   } else {
  //     copy(`http://localhost:3000/drinks/${recipeID}`);
  //     setWasShared(true);
  //   }
  // };

  const handleFavorite = ({ target }) => { // req 54: testar quando tivermos o local storage todo configurado
    const targetID = target.closest('button').value;
    const newArray = faveRecipes.filter((recipe) => recipe.id !== targetID);
    setFaveRecipes(newArray);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };

  return (
    <div className="theCard">
      <Link
        className="cardImage"
        to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
      >
        <img
          className="card-image"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        {/* <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3> */}
      </Link>
      <div className="cardInformation">
        <Link
          className="cardName"
          to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
        >
          <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        </Link>
        {
          type === 'meal'
            ? (
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${nationality} - ${category}`}
              </h4>)
            : (
              <h4 data-testid={ `${index}-horizontal-top-text` }>{alcohol}</h4>)
        }
      </div>
      <div className="buttons">
        <Share
          index={ index }
          type={ type }
          id={ id }
          testid={ `${index}-horizontal-share-btn` }
        />
        <button
        // data-testid={ `${index}-horizontal-favorite-btn` }
          type="button"
          value={ id }
          // src="src/images/blackHeartIcon.svg"
          onClick={ handleFavorite }
        >
          {/* Unfavorite */}
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="unfavorite"
          />
        </button>
        <br />
        <div>
          { wasShared && <p>Link copied!</p>}
        </div>
      </div>

    </div>
  );
}

Cards.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  alcohol: PropTypes.string,
  index: PropTypes.string,
}.isRequired;

export default Cards;

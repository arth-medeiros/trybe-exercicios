import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CheckBoxIngredients from './CheckBoxIngredients';
import AppContext from '../context/AppContext';
import Share from './Share';
import FavoriteButton from './FavoriteButton';

function DrinkInProgress(props) {
  const { recipe, ingredients } = props;
  const { inProgress, wasShared } = useContext(AppContext);
  const [notAble, setNotAble] = useState(true);
  const {
    idDrink,
    strDrink,
    strCategory,
    strDrinkThumb,
    strAlcoholic,
  } = recipe[0];

  const validateIngredients = () => {
    let doneSteps = [];
    if (inProgress.drinks[recipe[0].idDrink] !== undefined) {
      doneSteps = inProgress.drinks[recipe[0].idDrink];
    }
    if (doneSteps.length === ingredients.length && ingredients.length !== 0) {
      setNotAble(false);
    } else {
      setNotAble(true);
    }
  };
  useEffect(() => {
    validateIngredients();
  }, []);

  useEffect(() => {
    validateIngredients();
  }, [inProgress]);

  const history = useHistory();

  const finishRecipe = () => {
    const dateNow = new Date();
    const newRecipe = {
      id: idDrink,
      nationality: '',
      name: strDrink,
      category: strCategory,
      image: strDrinkThumb,
      tags: [],
      alcoholicOrNot: strAlcoholic,
      type: 'drink',
      doneDate: dateNow.toISOString(),
    };
    let newArray = [];
    let actualDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (actualDone === null) {
      actualDone = [];
    }
    const actualArray = [...actualDone];
    const alreadyDone = actualArray.some((element) => (
      element.id === recipe[0].idDrink
    ));
    if (actualArray.length > 0 && !alreadyDone) {
      const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newArray = [...savedRecipes, newRecipe];
    } else if (actualArray.length > 0 && alreadyDone) {
      const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newArray = [...savedRecipes];
    } else {
      newArray = [newRecipe];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(newArray));
    history.push('/done-recipes');
  };

  return (
    <div className="recipeInProgressContainer">
      <div className="inProgressCard">
        <img
          src={ recipe[0].strDrinkThumb }
          alt={ recipe[0].strDrink }
          data-testid="recipe-photo"
          className="card-image"
        />
        <div className="inProgressData">
          <h3
            data-testid="recipe-title"
            className="recipe-title"
          >
            { recipe[0].strDrink }
          </h3>
          <h4
            data-testid="recipe-category"
            className="recipe-category"
          >
            { recipe[0].strCategory }
          </h4>
          <p className="recipe-category">{ recipe[0].strAlcoholic }</p>
          <div className="inProgressControls">
            <Share
              index="0"
              type="drink"
              id={ recipe[0].idDrink }
              testid="share-btn"
            />
            <FavoriteButton
              testid="favorite-btn"
              recipe={ recipe[0] }
              type="drink"
            />
          </div>
          <div className="copied-container">
            { wasShared && <p>Link copied!</p>}
          </div>
        </div>
      </div>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <CheckBoxIngredients
              recipe={ recipe[0] }
              key={ index }
              index={ index }
              ingredient={ ingredient }
            />
          ))
        }
      </ul>
      <p
        data-testid="instructions"
        className="instructions"
      >
        { recipe[0].strInstructions }
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ notAble }
        onClick={ finishRecipe }
        className={ `btn-finish-${notAble}` }
      >
        Finish
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})),
  ingredients: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default DrinkInProgress;

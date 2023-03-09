import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import {
  converStrToId,
  convertObjToPadronized,
  filterMeasuresAndIngredients,
  filterDinamic,
  genericFetch,
} from './HelperRecipesDetails';

import '../../styles/RecomendedRecipes.css';
import RecomendedCard from '../RecomendedCard';
import List from '../List';
import CardDetails from '../CardDetails';

import '../../styles/RecipeDetails.css';
import Header from '../Header';

function RecipesDetails({ history }) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [recomended, setRecomended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const urlInclude = converStrToId(history.location.pathname);
  const dataContext = useContext(AppContext);

  const getRecipeInProgress = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let progressExist = false;
    let verifyProgress = false;
    const type = history.location.pathname.includes('meals') ? 'meals' : 'drinks';
    if (recipesInProgress !== null) {
      progressExist = true;
      const recipes = Object.keys(recipesInProgress[type]);
      if (recipes.length > 0) {
        verifyProgress = recipes.some((recipe) => (
          recipe === urlInclude
        ));
      }
    }
    setRecipeInProgress((progressExist && verifyProgress));
    setIsLoading(false);
  };

  useEffect(() => {
    const drinksOrMeals = async () => {
      try {
        if (history.location.pathname.includes('drink')) {
          const responseMeals = await genericFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'drink');

          return setRecomended(responseMeals);
        }
        const responseDrinks = await genericFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'meal');

        return setRecomended(responseDrinks);
      } catch (error) {
        // console.log(error);
      }
    };
    drinksOrMeals();
  }, [history.location.pathname]);

  useEffect(() => {
    getRecipeInProgress();
  }, []);

  useEffect(() => {
    async function fetchDrinksOrFoods() {
      if (history.location.pathname.includes('drink')) {
        const responseDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlInclude}`);
        const jsonDrink = await responseDrink.json();
        const filterMAndI = filterMeasuresAndIngredients(jsonDrink, 'drink');

        const ingredients = filterDinamic(filterMAndI, jsonDrink, 'drink')[0];
        const measures = filterDinamic(filterMAndI, jsonDrink, 'drink')[1];

        const obj = convertObjToPadronized('drink', jsonDrink);

        obj.ingredients = ingredients;
        obj.measures = measures;
        // obj.category = `${jsonDrink.drinks[0].strAlcoholic}
        // ${jsonDrink.drinks[0].strCategory}`;

        return setSelectedCategory(obj);
      }
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlInclude}`);
      const jsonMeals = await response.json();
      const filterMAndI = filterMeasuresAndIngredients(jsonMeals, 'meal');
      // console.log(jsonMeals);
      const ingredients = filterDinamic(filterMAndI, jsonMeals, 'meal')[0];
      const measures = filterDinamic(filterMAndI, jsonMeals, 'meal')[1];
      const obj = convertObjToPadronized('meal', jsonMeals);

      obj.ingredients = ingredients;
      obj.measures = measures;
      obj.category = jsonMeals.meals[0].strCategory;

      return setSelectedCategory(obj);
    }
    fetchDrinksOrFoods();
  }, [
    history.location.pathname,
    urlInclude,
    dataContext.fetchDrinks,
    dataContext.fetchMeals,
  ]);

  return (
    <div className="containerRecipeDetails">
      <Header title="" />
      <CardDetails
        selectedCategory={ selectedCategory }
        history={ history }
      />

      <List
        selectedCategory={ selectedCategory }
        history={ history }
      />

      <RecomendedCard
        recomended={ recomended }
        selectedCategory={ selectedCategory }
        history={ history }
      />
      <div>
        {!isLoading && (
          <button
            type="button"
            className="btnStartRecipe"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ async () => {
              if (history.location.pathname.includes('meal')) {
                await dataContext.setRecipesInProgress([selectedCategory]);
                return history.push(`/meals/${selectedCategory.id}/in-progress`);
              }
              await dataContext.setRecipesInProgress([selectedCategory]);
              history.push(`/drinks/${selectedCategory.id}/in-progress`);
            } }
          >
            { !recipeInProgress ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        ) }
      </div>
    </div>
  );
}

RecipesDetails.propTypes = {
  history: PropTypes.objectOf(Object),
}.isRequired;

export default RecipesDetails;

import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState({});
  const fetchDrinks = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const fetchDrinksCategory = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const fetchMeals = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const fetchFoodsCategorys = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const [faveRecipes, setFaveRecipes] = useState([]);
  const [wasShared, setWasShared] = useState(false); // usar para construir ternário com msg "Link copied!"
  const [inProgress, setInProgress] = useState({
    meals: [],
    drinks: [],
  });
  const [filteredRecipes, setFilteredRecipes] = useState({ meals: [], drinks: [] });
  const [currentPage, setCurrentPage] = useState('');

  const srchToggle = useCallback(() => {
    setIsActive(isActive === false);
  }, [isActive]);

  const values = useMemo(() => ({
    user,
    setUser,
    isSrchActive: isActive,
    srchToggle,
    fetchDrinks,
    fetchDrinksCategory,
    fetchMeals,
    fetchFoodsCategorys,
    faveRecipes,
    setFaveRecipes,
    wasShared,
    setWasShared,
    recipes,
    setRecipes,
    inProgress,
    setInProgress,
    recipesInProgress,
    setRecipesInProgress,
    filteredRecipes,
    setFilteredRecipes,
    currentPage,
    setCurrentPage,
  }), [
    user,
    isActive,
    srchToggle,
    fetchDrinks,
    fetchDrinksCategory,
    fetchMeals,
    fetchFoodsCategorys,
    faveRecipes,
    setFaveRecipes,
    wasShared,
    setWasShared,
    recipes,
    inProgress,
    recipesInProgress,
    setRecipesInProgress,
    filteredRecipes,
    setFilteredRecipes,
    currentPage,
    setCurrentPage,
  ]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default AppProvider;

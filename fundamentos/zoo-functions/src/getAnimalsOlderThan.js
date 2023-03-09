const data = require('../data/zoo_data');

const checkAge = (idade, animalObj) => {
  const arr = Object.values(animalObj[0].residents);
  return arr.every((e) => e.age >= idade);
};
const getAnimal = (animal) => data.species.filter((e) => e.name === animal);
function getAnimalsOlderThan(animal, age) {
  let bool = false;
  const animalObj = getAnimal(animal);
  bool = checkAge(age, animalObj);
  return bool;
}

module.exports = getAnimalsOlderThan;

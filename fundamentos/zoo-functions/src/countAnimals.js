const data = require('../data/zoo_data');

const animList = data.species;

const allResidents = (obj) => {
  animList.forEach((e) => {
    const { name } = e;
    const quant = e.residents.length;
    Object.assign(obj, { [name]: quant });
  });
};

const onlySpecies = (anim) => {
  const specie = animList.find((e) => e.name === anim.specie);
  return specie.residents.length;
};

const speciesAndGender = (anim) => {
  const specie = animList.find((e) => e.name === anim.specie);
  const res = specie.residents;
  const filteredSpecies = res.filter((e) => e.sex === anim.sex);
  return filteredSpecies.length;
};

function countAnimals(animal) {
  if (!arguments.length) {
    const residents = {};
    allResidents(residents);
    return residents;
  }
  if (Object.keys(animal).length === 1) {
    return onlySpecies(animal);
  }
  if (Object.keys(animal).length === 2) {
    return speciesAndGender(animal);
  }
}

module.exports = countAnimals;

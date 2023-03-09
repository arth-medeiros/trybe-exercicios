const data = require('../data/zoo_data');

const { species } = data;

function fillArray(arr, str) {
  species.forEach((e) => {
    if (e.location === str) {
        arr.push(e.name);
    }
  });
}

function fillArrayWithName(arr, str) {
  species.forEach((e) => {
    if (e.location === str) {
      const tempArr = [];
      e.residents.forEach((x) => {
        tempArr.push(x.name);
      });
      arr.push({[e.name]: tempArr});
    }
  });
}

function getAnimalsWithName() {
  const neAnimals = [];
  fillArrayWithName(neAnimals, 'NE');
  const nwAnimals = [];
  fillArrayWithName(nwAnimals, 'NW');
  const seAnimals = [];
  fillArrayWithName(seAnimals, 'SE');
  const swAnimals = [];
  fillArrayWithName(swAnimals, 'SW');
  return {
    NE: neAnimals,
    NW: nwAnimals,
    SE: seAnimals,
    SW: swAnimals,
  };
}

function getAllAnimals() {
  const neAnimals = [];
  fillArray(neAnimals, 'NE');
  const nwAnimals = [];
  fillArray(nwAnimals, 'NW');
  const seAnimals = [];
  fillArray(seAnimals, 'SE');
  const swAnimals = [];
  fillArray(swAnimals, 'SW');
  return {
    NE: neAnimals,
    NW: nwAnimals,
    SE: seAnimals,
    SW: swAnimals,
  };
}

function getAnimalMap(options) {
  switch (true) {
  case Boolean(options) !== true:
    return getAllAnimals();

  case Boolean(Object.keys(options).includes('includeNames')):
    return getAnimalsWithName();

  case Boolean(Object.keys(options).includes('sex') && Object.keys(options).includes('sorted')):
    return getAllAnimals();

  case Boolean(Object.keys(options).includes('sex')):
    return getAllAnimals();

  default:
    break;
  }
}

console.log(getAnimalMap({ includeNames: true }));

module.exports = getAnimalMap;

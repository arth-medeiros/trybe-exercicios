const data = require('../data/zoo_data');

const { employees } = data;
const { species } = data;

function getOldestFromFirstSpecies(id) {
  const emp = employees.find((e) => e.id === id);
  const firstSpecies = species.find((e) => e.id === emp.responsibleFor[0]);
  let counter = 0;
  let oldest;
  firstSpecies.residents.forEach((e) => {
    if (e.age > counter) {
      counter = e.age;
      oldest = e;
    }
  });
  return Object.values(oldest);
}

module.exports = getOldestFromFirstSpecies;

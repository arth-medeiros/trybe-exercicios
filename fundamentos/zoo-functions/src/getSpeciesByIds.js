const data = require('../data/zoo_data');

const createArray = (ids) => data.species.filter((e) => e.id === ids);

function getSpeciesByIds(...ids) {
  let newArray = createArray(ids[0]);
  for (let i = 1; i < ids.length; i += 1) {
    const tempArray = (createArray(ids[i]));
    const concArray = newArray.concat(tempArray);
    newArray = concArray;
  }
  return newArray;
}

module.exports = getSpeciesByIds;

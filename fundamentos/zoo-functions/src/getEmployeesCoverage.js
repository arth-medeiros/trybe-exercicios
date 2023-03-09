const data = require('../data/zoo_data');

const { employees } = data;
const { species } = data;

const getAnimalSpecies = (id, namesArr) => {
  const animal = species.find((e) => e.id === id);
  const temp = animal.name;
  namesArr.push(temp);
};

const getAnimalLocs = (name, locs) => {
  const animal = species.find((e) => e.name === name);
  const temp = animal.location;
  locs.push(temp);
};

const getDataByName = (obj) => {
  const employee = employees.find((e) => e.firstName === obj.name || e.lastName === obj.name);
  const { id } = employee;
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const managedAnimals = [];
  employee.responsibleFor.forEach((e) => {
    getAnimalSpecies(e, managedAnimals);
  });
  const locs = [];
  managedAnimals.forEach((e) => {
    getAnimalLocs(e, locs);
  });
  const infoContainer = {
    ident: id,
    name: fullName,
    animals: managedAnimals,
    locals: locs,
  };
  return infoContainer;
};

const getDataById = (obj) => {
  const employee = employees.find((e) => e.id === obj.id);
  const { id } = obj;
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const managedAnimals = [];
  employee.responsibleFor.forEach((e) => {
    getAnimalSpecies(e, managedAnimals);
  });
  const locs = [];
  managedAnimals.forEach((e) => {
    getAnimalLocs(e, locs);
  });
  const infoContainer = {
    ident: id,
    name: fullName,
    animals: managedAnimals,
    locals: locs,
  };
  return infoContainer;
};

const objectConstructor = (obj) => ({
  id: obj.ident,
  fullName: obj.name,
  species: obj.animals,
  locations: obj.locals,
});

const checkNameValidity = (obj) =>
  employees.find((e) => e.firstName === obj.name || e.lastName === obj.name);

const checkIdValidity = (obj) =>
  employees.find((e) => e.id === obj.id);

function getEmployeesCoverage(obj) {
  if (!arguments.length) {
    const newArr = [];
    employees.forEach((e) => {
      newArr.push(objectConstructor(getDataById(e)));
    });
    return newArr;
  }
  if (checkNameValidity(obj)) {
    return objectConstructor(getDataByName(obj));
  }
  if (checkIdValidity(obj)) {
    return objectConstructor(getDataById(obj));
  }
  throw new Error('Informações inválidas');
}

module.exports = getEmployeesCoverage;

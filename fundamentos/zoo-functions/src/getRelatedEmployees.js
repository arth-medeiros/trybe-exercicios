const data = require('../data/zoo_data');

const empList = data.employees;

function isManager(id) {
  let bool = false;
  empList.every((e) => {
    bool = e.managers.includes(id);
    if (bool === true) {
      return false;
    }
    return true;
  });
  return bool;
}

const getNames = (element) => `${element.firstName} ${element.lastName}`;

const createArray = (id) => {
  const nameArray = [];
  empList.forEach((e) => {
    if (e.managers.includes(id)) {
      nameArray.push(getNames(e));
    }
  });
  return nameArray;
};

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === true) {
    return createArray(managerId);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };

const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  let empObj = data.employees.find((e) => e.firstName === employeeName
    || e.lastName === employeeName);
  if (empObj !== undefined) {
    return empObj;
  }
  empObj = {};
  return empObj;
}

module.exports = getEmployeeByName;

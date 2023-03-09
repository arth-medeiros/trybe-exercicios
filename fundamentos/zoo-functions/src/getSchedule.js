const data = require('../data/zoo_data');

const { hours } = data;
const { species } = data;

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday'];

const getAvailableAnimals = (day) => {
  const newArray = [];
  species.forEach((e) => {
    if (e.availability.includes(day)) {
      newArray.push(e.name);
    }
  });
  return newArray;
};

const objectContructor = (day) => {
  if (day === 'Monday') {
    return { [day]: {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!' },
    };
  }
  return { [day]: {
    officeHour: `Open from ${hours[day].open}am until ${hours[day].close}pm`,
    exhibition: getAvailableAnimals(day) },
  };
};

function getSchedule(scheduleTarget) {
  const targetAnimal = species.find((e) => e.name === scheduleTarget);
  if (targetAnimal) {
    return targetAnimal.availability;
  }
  if (!arguments.length || !daysOfTheWeek.includes(scheduleTarget)) {
    const newObj = {};
    daysOfTheWeek.forEach((e) => Object.assign(newObj, objectContructor(e)));
    return newObj;
  }
  if (daysOfTheWeek.includes(scheduleTarget)) {
    const newObj = objectContructor(scheduleTarget);
    return newObj;
  }
}

module.exports = getSchedule;

const data = require('../data/zoo_data');

const entries = data.prices;

const arrayConstructor = (c, a, s) =>
  ({ child: c, adult: a, senior: s });

function countEntrants(entrants) {
  let child = 0;
  let adult = 0;
  let senior = 0;
  entrants.forEach((e) => {
    if (e.age < 18) {
      child += 1;
    } else if (e.age >= 18 && e.age < 50) {
      adult += 1;
    } else {
      senior += 1;
    }
  });
  return arrayConstructor(child, adult, senior);
}

function calculateEntry(entrants) {
  if (!arguments.length || Object.keys(entrants).length === 0) {
    return 0;
  }
  const arr = countEntrants(entrants);
  const totalPrice = arr.child * entries.child + arr.adult * entries.adult
    + arr.senior * entries.senior;
  return totalPrice;
}

module.exports = { calculateEntry, countEntrants };

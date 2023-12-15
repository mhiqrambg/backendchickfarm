// CommonJS Modules
const { Random } = require('random-js');
const random = new Random();

const generateRandomNumber = random.integer(1, 99);
// console.log(generateRandomNumber);

module.exports = {
  generateRandomNumber,
};

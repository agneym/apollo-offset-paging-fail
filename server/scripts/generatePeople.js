const { name } = require('faker');

function generatePeople(length = 4) {
  const data = [];
  for(let i = 0; i < length; i+=1) {
    data.push({
      first_name: name.firstName(),
      last_name: name.lastName(),
      job_title: name.jobTitle(),
    });
  }
  return data;
}

module.exports = generatePeople;
import { uid } from 'uid';
import { name } from 'faker';

function generatePeople(length = 4) {
  const data = [];
  for(let i = 0; i < length; i+=1) {
    data.push({
      id: uid(),
      firstName: name.firstName,
      lastName: name.lastName,
      jobTitle: name.jobTitle,
    });
  }
  return data;
}

export default generatePeople;
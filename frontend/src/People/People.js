import { useQuery } from '@apollo/client';

import GET_PEOPLE from './getPeople.graphql';

function People() {
  const { data, loading, error } = useQuery(GET_PEOPLE);
  console.log(data);
  return (
    <p>People</p>
  );
}

export default People;


import { useQuery } from '@apollo/client';
import 'twin.macro';
import { useLoading, Audio } from '@agney/react-loading';

import GET_PEOPLE from './getPeople.graphql';
import Person from './Person';

function People() {
  const { data, loading, error } = useQuery(GET_PEOPLE);
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Audio width="50" />,
  });

  if(loading) {
    return <p>Loading...</p>
  }
  return (
    <section tw="p-4">
      <h2 tw="text-2xl font-bold my-10">People</h2>
      <div tw="grid grid-cols-5 gap-4" {...containerProps}>
        {data?.people.map((person) => (
          <Person key={person.id} data={person} />
        ))}
        {indicatorEl}
      </div>
    </section>
  );
}

export default People;


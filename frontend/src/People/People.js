import { useQuery } from '@apollo/client';
import 'twin.macro';
import { useLoading, Audio } from '@agney/react-loading';

import GET_PEOPLE from './getPeople.graphql';
import Person from './Person';

function People() {
  const { data, loading, error } = useQuery(GET_PEOPLE);
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: (
      <div tw="text-green-400 absolute inset-1/2 ">
        <Audio width="50" />
      </div>
    ),
  });

  if(error) {
    return (
      <section tw="text-red-600">
        <p>Could not load people. Try again.</p>
        <code>{JSON.stringify(error)}</code>
      </section> 
    )
  }

  return (
    <section tw="px-8 py-4">
      <h2 tw="text-2xl font-bold my-10">People</h2>
      <div tw="grid grid-cols-5 gap-4" {...containerProps}>
        {indicatorEl}
        {data?.people.map((person) => (
          <Person key={person.id} data={person} />
        ))}
      </div>
    </section>
  );
}

export default People;


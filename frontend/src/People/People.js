import "twin.macro";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useLoading, Audio } from "@agney/react-loading";

import Pagination from "../Pagination";
import GET_PEOPLE from "./getPeople.graphql";
import Person from "./Person";

const PAGE_SIZE = 10;

function People() {
  const { data, loading, error, fetchMore } = useQuery(GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: (
      <div tw="text-green-400 absolute inset-1/2 ">
        <Audio width="50" />
      </div>
    ),
  });

  if (error) {
    return (
      <section tw="text-red-600">
        <p>Could not load people. Try again.</p>
        <code>{JSON.stringify(error)}</code>
      </section>
    );
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMore({
      variables: {
        offset: (newPage - 1) * PAGE_SIZE,
      },
    });
  };

  console.log('Length of data on Grid', { length: data?.people.nodes.length ?? 0 });

  return (
    <section tw="px-8 py-4">
      <header tw="my-10">
        <h2 tw="text-2xl font-bold">People</h2>
        <sub tw="text-sm text-gray-500">
          {data?.people.totalCount} total results
        </sub>
      </header>
      <div tw="grid grid-cols-5 gap-4" {...containerProps}>
        {indicatorEl}
        {data?.people.nodes.map((person) => (
          <Person key={person.id} data={person} />
        ))}
      </div>
      <div tw="pt-4 border-gray-300">
        <Pagination
          currentPage={currentPage}
          itemsOnPage={PAGE_SIZE}
          onChange={handlePageChange}
          totalItems={data?.people.totalCount ?? 0}
        />
      </div>
    </section>
  );
}

export default People;

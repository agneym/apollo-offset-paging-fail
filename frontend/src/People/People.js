import "twin.macro";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useLoading, Audio } from "@agney/react-loading";
import { useToasts } from 'react-toast-notifications'

import GET_PEOPLE from "./getPeople.graphql";
import CREATE_PERSON from "./createPerson.graphql";

import Pagination from "../Pagination";
import Header from "./Header";
import Person from "./Person";
import usePagination from "../Pagination/usePagination";

const PAGE_SIZE = 10;

function People() {
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast } = useToasts();

  const [getPeople, { data, loading, error, fetchPage }] = usePagination(GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    variables: {
      first: PAGE_SIZE,
    },
  });

  const [createPerson, {data: createData}] = useMutation(CREATE_PERSON, {
    refetchQueries: [{
      query: GET_PEOPLE,
      variables: {
        first: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
      }
    }],
    onCompleted: (data) => {
      const { createPerson: { person: { firstName, lastName }}} = data;
      addToast(`Added new person - ${firstName} ${lastName}`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  });

  useEffect(() => {
    getPeople()
  }, []);

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
    fetchPage(newPage);
  };

  const handleAdd = (data) => {
    createPerson({
      variables: {
        input: {
          person: data,
        }
      },
    });
  };

  return (
    <section tw="px-8 py-4">
      <Header totalCount={data?.allPeople.totalCount} onAdd={handleAdd} />
      <div tw="grid grid-cols-5 gap-4" {...containerProps}>
        {indicatorEl}
        {data?.allPeople.nodes.map((person) => (
          <Person key={person.id} data={person} />
        ))}
      </div>
      <div tw="pt-4 border-gray-300">
        <Pagination
          currentPage={currentPage}
          itemsOnPage={PAGE_SIZE}
          onChange={handlePageChange}
          totalItems={data?.allPeople.totalCount ?? 0}
        />
      </div>
    </section>
  );
}

export default People;

import { useLazyQuery } from '@apollo/client';

const defaultPageOptions = {
  initialPage: 1,
  perPage: 10,
  offsetKey: 'offset',
};

/**
 * fetchMore helper for offset based pagination.
 * @param {DocumentNode | TypedDocumentNode<TData, TVariables>} query 
 * @param {LazyQueryHookOptions<TData, TVariables>} options 
 * @param {typeof defaultPageOptions} pageOptions
 */
function usePagination(query, options, pageOptions = defaultPageOptions) {
  const [lazyQuery, queryResults] = useLazyQuery(query, options);

  const fetchMore = async (newOptions) => {
    lazyQuery({
      variables: {
        ...options.variables,
        ...newOptions.variables,
      },
    });
  }

  /**
   * Fetch more items when on new page
   * @param {number} newPage New page number
   */
  const fetchPage = async (newPage) => {
    const { offsetKey, perPage } = pageOptions;
    fetchMore({
      variables: {
        [offsetKey]: (newPage - 1) * perPage,
      },
    });
  }

  console.log(queryResults?.data?.allPeople.nodes.length)

  return [lazyQuery, {
    ...queryResults,
    fetchPage,
  }]
}

export default usePagination;
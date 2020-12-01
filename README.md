# Apollo Offset Pagination Fail 

> Do not try this at home. Failure case.

# read offset

Paginated read does not provide offset when reading pages. `offset` is always `undefined`, it does not care for variables added from `fetchMore` function.

https://github.com/agneym/apollo-offset-paging-fail/tree/0-empty-read

# merge flat

Using the `merge` function, we are trying to leave gaps in the array for pages being served. But this is not respected by Apollo and it is normalized to remove gaps when accessing from component 

https://github.com/agneym/apollo-offset-paging-fail/tree/1-flat-merge

# working case - no cache

sets up postgraphile. `merge` function just returns the incoming nodes, clearing cache on each fetch.

https://github.com/agneym/apollo-offset-paging-fail/tree/3-refetching
/**
 * This is copied from Github issue on offset limit paginated field and customised for our fields
 * But this is does not seem to do anything for us.
 */
export function offsetLimitPaginatedField() {
  return {
    keyArgs: false,
    merge(existing, incoming, { args, canRead, readField }) {
      const offset = args?.offset ?? -1;
      const first = args?.first ?? 10;

      // Insert the incoming elements in the right places, according to args.
      if (offset >= 0 && first > 0) {
        // filter dangling references from the existing items
        const merged = existing?.nodes.length
          ? existing.nodes.slice(0).filter(canRead)
          : [];
        // we need the offset difference of the existing array and what was requested,
        // since existing can already contain newly inserted items that may be present in the incoming
        const offsetDiff = Math.max(merged?.length - offset, 0);
        const end = offset + Math.min(first, incoming.nodes.length);
        for (let i = offset; i < end; ++i) {
          const node = incoming.nodes[i - offset];

          // find if the node is already present in the array
          // this could happen when new  obj is added at the top of the list, and when
          // requesting a new page to the server, the server sends the same id back in the new page
          const existing = merged.find(
            (m) => readField("id", m) === readField("id", node)
          );

          if (!existing) {
            merged[i + offsetDiff] = node;
          }
        }
        // we filter for empty spots in case the incoming contained existing items.
        // This could happen if items were inserted at the top of the list
        const nodes = merged.filter((m) => m);

        return {
          ...incoming,
          nodes,
        };
      }

      return incoming;
    },
    read(existing, { args, canRead }) {
      console.log({ existing, args });
      const offset = args?.offset ?? -1;
      const first = args?.first ?? -1;

      if (offset < 0 && first < 0) {
        return existing;
      }

      // If we read the field before any data has been written to the
      // cache, this function will return undefined, which correctly
      // indicates that the field is missing.
      const nodes =
        existing?.length && offset >= 0 && first > 0
          ? existing.nodes
              // we filter for empty spots because its likely we have padded spots with nothing in them.
              // also filter obj that are not valid references (removed from the cache)
              .filter(canRead)
          : existing;
      // we have to filter first in order to slice only valid references and prevent a
      // server roundtrip if length doesn't cover the items per page
      const page = nodes?.length ? nodes.slice(offset, offset + first) : nodes;
      // if the total items read from the cache is less than the number requested,
      // but the total items is greater, it means that we don't have enough items cached,
      // so in order to request the items from the server instead, we return undefined
      // for this to work we need to know the total count of all items
      const itemsPerPage = args?.limit || 0;
      if (page?.length < itemsPerPage && nodes?.length < existing?.totalCount) {
        return undefined;
      }

      if (nodes?.length) {
        return {
          ...existing,
          nodes: page,
        };
      }
    },
  };
}

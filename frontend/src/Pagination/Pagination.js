import tw from "twin.macro";

function Pagination({ totalItems, itemsOnPage, onChange, currentPage }) {
  const totalPages = Math.floor((totalItems - 1) / itemsOnPage) + 1;

  return (
    <div tw="flex justify-center">
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            css={[tw`mx-2`, currentPage === pageNumber && tw`font-semibold`]}
            onClick={() => onChange(pageNumber)}
            key={i+1}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;

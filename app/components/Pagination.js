// Pagination.js
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }
  
    return <div className="pagination">{pages}</div>;
  }
  
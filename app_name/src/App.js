import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        alert('Failed to fetch data');
      } finally {
        setIsLoading(false); // Update loading state
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1)); // Ensure page >= 1
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1)); // Ensure page <= totalPages
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Show loading state
  }

  return (
    <div className="App">
      <table>
        {/* Table content remains the same */}
      </table>
      
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          data-testid="previous-button" // Add test ID for testing
        >
          Previous
        </button>
        <span data-testid="page-indicator"> 
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
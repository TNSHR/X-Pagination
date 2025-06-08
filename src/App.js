import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    if (currentPage === 1) return;
    setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(prev => prev + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="loading">Loading employee data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          data-testid="previous-button"
          className={currentPage === 1 ? 'disabled' : ''}
        >
          Previous
        </button>

        <span data-testid="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          data-testid="next-button"
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // Fetch data from the backend API running on port 3001
    fetch('http://localhost:3001/api/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data.message))
      .catch((error) => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Backend Message: {data ? data : 'shat...'}</p>
    </div>
  );
}

export default App;
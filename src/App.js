import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "RA2111028010209"; 
  }, []);

  const handleSubmit = async () => {
    try {
      const trimmedInput = jsonInput.trim();
      
      console.log("Raw input:", jsonInput);
      console.log("Trimmed input:", trimmedInput);

      // Check if the input is valid JSON
      const parsedJson = JSON.parse(trimmedInput);

      console.log("Parsed JSON:", parsedJson);

      const result = await axios.post('https://bfhl-1oin.onrender.com/bfhl', parsedJson);

      setResponse(result.data);
      setError(null);
    } catch (err) {
      console.log("Error:", err.message);
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);

    const newSelectedOptions = value.reduce((acc, curr) => {
      if (acc.includes(curr)) {
        return acc.filter(item => item !== curr);
      } else {
        return [...acc, curr];
      }
    }, selectedOptions);

    setSelectedOptions(newSelectedOptions);
  };
  

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.header}>BFHL Challenge</h1>

      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
        style={styles.textArea}
      />

      <button onClick={handleSubmit} style={styles.button}>Submit</button>

      {error && <p style={styles.errorText}>{error}</p>}
      
      {response && (
        <>
          <h3 style={styles.subHeader}>Response</h3>
          
          <select
            multiple
            onChange={handleOptionChange}
            style={styles.select}
            value={selectedOptions} 
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          
          <div style={styles.resultContainer}>
            {selectedOptions.includes('alphabets') && (
              <p style={styles.resultText}>Alphabets: {JSON.stringify(response.alphabets)}</p>
            )}
            {selectedOptions.includes('numbers') && (
              <p style={styles.resultText}>Numbers: {JSON.stringify(response.numbers)}</p>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <p style={styles.resultText}>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#555',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  resultContainer: {
    marginTop: '20px',
    textAlign: 'left',
  },
  resultText: {
    backgroundColor: '#e7f5ff',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    color: '#333',
  },
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=${selectedRegion.value}&apiKey=a136f4a85dff425eb88ae2846aedd4ad`
        )
        .then(response => {
          setArticles(response.data.articles);
        })
        .catch(error => {
          console.error('Error fetching news:', error);
        });
    }
  }, [selectedRegion]);

  const regionOptions = [
    { value: 'us', label: 'United States' },
    { value: 'in', label: 'India'},
    { value: 'gb', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    // Add more regions as needed
  ];

  return (
    <div className="App">
      <h1>Daily News</h1>
      <Select
        options={regionOptions}
        onChange={setSelectedRegion}
        placeholder="Select a region"
      />
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

export default function FetchRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && data && (
        <>
          <h1>Posts</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {data.map((post, index) => (
              <li key={post.id} style={{ marginBottom: '1em' }}>
                <h2>{index + 1}. {post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}


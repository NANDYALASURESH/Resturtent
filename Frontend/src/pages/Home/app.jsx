import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Keerthi Foods</h1>
      <p style={styles.text}>You have successfully logged in!</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
  },
  heading: {
    color: '#333',
    fontSize: '2.5rem',
  },
  text: {
    color: '#666',
    fontSize: '1.2rem',
  }
};

export default Home;

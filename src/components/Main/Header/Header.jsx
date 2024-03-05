import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>To-Do List</h1>
    </header>
  );
};

const headerStyle = {
  background: '#f3f4f6',
  color: '#333',
  textAlign: 'center',
  padding: '10px 0',
  fontFamily: "'Nunito', sans-serif",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
};

export default Header;

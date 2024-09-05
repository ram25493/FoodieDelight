import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/admin/restaurants">Admin - Restaurant List</Link>
      <Link to="/admin/restaurants/new">Admin - Add Restaurant</Link>
    </nav>
  );
};

export default Navbar;

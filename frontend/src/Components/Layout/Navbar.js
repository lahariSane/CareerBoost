import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Resume Scorer
      </Link>
      <div>
        <Link to="/" className="mx-4 hover:text-gray-400">Home</Link>
        <Link to="/about" className="mx-4 hover:text-gray-400">About</Link>
        <Link to="/resume-builder" className="mx-4 hover:text-gray-400">Resume Builder</Link>
      </div>
    </nav>
  );
}

export default Navbar;

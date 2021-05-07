import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ApplicantNavbar extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/applicant/dashboard" className="navbar-brand">Dashboard</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/search" className="nav-link">Search</Link>
          </li>
          <li className="navbar-item">
          <Link to="/my_applications" className="nav-link">My Applications</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/" onClick={() => {
            localStorage.clear();
            window.location.href = "/"; }}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
     </div>
    );
  }
}
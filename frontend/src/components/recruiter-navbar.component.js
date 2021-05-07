import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RecruiterNavbar extends Component {

  render() {
    let recruiter_id = localStorage.getItem('user_id');
    let recruiter_name = localStorage.getItem('user_name');

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/recruiter/dashboard" className="navbar-brand">Dashboard</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/add-job" className="nav-link">Add listing</Link>
          </li>
          <li className="navbar-item">
          <Link to="/listings" className="nav-link">View listings</Link>
          </li>
          <li className="navbar-item">
          <Link to="/accepted_employees" className="nav-link">View Accepted employees</Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/" onClick={() => {
            localStorage.clear();
            window.location.href = "/"; }}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
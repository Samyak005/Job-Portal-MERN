import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Button} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ApplicantNavbar from "./components/applicant-navbar.component"
import RecruiterNavbar from "./components/recruiter-navbar.component"
import Register from "./components/register.component";
import Login from "./components/login.component";
import Search from "./components/job-search.component";
import Listings from "./components/job-listings.component";
import AddJob from "./components/add-job.component";
import Applications from "./components/application.component";
import Front from "./components/front.component";
import Accept from "./components/accept.component";
import Edit from "./components/edit.component"
import ApplicantDashboard from "./components/applicant-dashboard.component"
import RecruiterDashboard from "./components/recruiter-dashboard.component"
import AcceptedEmployees from "./components/accepted-employees.component"
import SOP from "./components/SOP.component"

class App extends React.Component {
  render() {
    let user_type = localStorage.getItem('user_type');  
    let navbar = null;
    if(user_type === "R")
      navbar = <RecruiterNavbar />;
    else if(user_type === "J")
      navbar = <ApplicantNavbar />;
    else
      navbar = <Navbar />;

    
    return (
      <Router>
        <div className="container">
          {navbar}
          <br></br>
          <Route exact path="/" render={()=> {
            if(user_type === "R") 
            {
              console.log("1");
              return <RecruiterDashboard/>
            }
              else if(user_type === "J") 
              {
                console.log("2");
                return <ApplicantDashboard/>
              }

            else return <Front/>
          }}  />
          <Route path="/front" component={Front} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/listings" component={Listings} />
          <Route path="/add-job" component={AddJob} />
          <Route path="/applications/recruiter_view/:id" component={Accept} />
          <Route path="/applications/view" component={Applications} />
          <Route path="/my_applications" component={Applications} />
          <Route path="/applicant/dashboard" component={ApplicantDashboard} />
          <Route path="/recruiter/dashboard" component={RecruiterDashboard} />
          <Route path="/accepted_employees" component={AcceptedEmployees} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/sop/:id" component={SOP} />
          

        </div>

      </Router>
    );
  }
}

export default App;

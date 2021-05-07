import React, {Component} from 'react';
import axios from 'axios';
// import CustomerNavbar from "./user-navbar.component"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'

export default class Search extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            jobs: [],
            applied: 0,
            search_salary_x:0,
            search_salary_y:50000,
            
            search_duration:7,
            search_type:'WFH'
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeSearch_salary_x = this.onChangeSearch_salary_x.bind(this);
        this.onChangeSearch_salary_y = this.onChangeSearch_salary_y.bind(this);
        this.onChangeSearch_duration = this.onChangeSearch_duration.bind(this);
        this.onChangeSearch_type = this.onChangeSearch_type.bind(this);
        this.sortbyRating = this.sortbyRating.bind(this);
        this.sortbySalary = this.sortbySalary.bind(this); 
        this.sortbyDuration = this.sortbyDuration.bind(this); 
        this.sortbyRatingA = this.sortbyRatingA.bind(this);
        this.sortbySalaryA = this.sortbySalaryA.bind(this); 
        this.sortbyDurationA = this.sortbyDurationA.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);
        this.placeApplication = this.placeApplication.bind(this);
    }
    
    onChangeSearch(e) {
        this.setState({ search: e.target.value });
    }

    onChangeSearch_salary_x(e) {
        this.setState({ search_salary_x: e.target.value });
    }
    onChangeSearch_salary_y(e) {
        this.setState({ search_salary_y: e.target.value });
    }
    onChangeSearch_duration(e) {
        this.setState({ search_duration: e.target.value });
    }
    onChangeSearch_type(e) {
        this.setState({ search_type: e.target.value });
    }

    onChangeType(e) {
        this.setState({ type: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        const Search = {
            name: this.state.search,
            salary_x: this.state.search_salary_x,
            salary_y: this.state.search_salary_y,
            duration: this.state.search_duration,
            type: this.state.search_type
        }

        console.log(Search);
        await axios.post('http://localhost:4000/api/jobs/search/'+localStorage.getItem('user_id'), Search)
             .then(res => {
                 if(res.data.length==0)
                    alert("No Job Found");

                console.log(res.data);
                this.setState({jobs: res.data});

            })
             .catch(err =>
                {
                    if(err.response)
                        alert(err.response.data);
                    console.log(err.response.data);
                });

        // this.setState({
        //     search : '',
        //     search_salary_x:0,
        //     search_salary_y:0,
            
        //     search_duration:0,
        //     search_type:'Type'
        // });
    }

    placeApplication(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const Application = {
            job: id,
            applicant : localStorage.getItem('user_id')
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/applications/apply',Application, {headers: headers})
          .then(response => { 
              alert("Applied for the job!");
              console.log(response.data)})
          .catch(err => {
              if(err.response)
                alert(err.response.data.message);
            // console.log(err)
        });
    
        this.setState({
          jobs: [],
    
        })
        // window.location.reload();
    }


    sortbySalary = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = jobs[j].salary;
                var left2 = jobs[j+1].salary;
                if(left < left2)
                {
                    var temp = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temp;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbySalaryA = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = jobs[j].salary;
                var left2 = jobs[j+1].salary;
                if(left > left2)
                {
                    var temp = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temp;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbyRating = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = jobs[j].rating; // can be jobs[j].recruiter.rating
                var left2 = jobs[j+1].rating;
                if(left < left2)
                {
                    var temp = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temp;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbyRatingA = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = jobs[j].rating; // can be jobs[j].recruiter.rating
                var left2 = jobs[j+1].rating;
                if(left > left2)
                {
                    var temp = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temp;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbyDuration = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = jobs[j].duration;
                var left2 = jobs[j+1].duration;
                if(left < left2)
                {
                    var temp = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temp;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbyDurationA = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = jobs[j].duration;
                var left2 = jobs[j+1].duration;
                if(left > left2)
                {
                    var temp = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temp;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    render() {
        // const { jobs} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.search}
                               onChange={this.onChangeSearch}
                               />  
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
                <Button variant="info" onClick={this.sortbyDuration} >Order by Duration Descending</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbySalary} >Order by Salary Descending</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyRating} >Order by Job Rating Descending</Button>
                <br></br>
                <Button variant="info" onClick={this.sortbyDurationA} >Order by Duration Ascending</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbySalaryA} >Order by Salary Ascending</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyRatingA} >Order by Job Rating Ascending</Button>
                
                <br></br>
                <label>Type: </label>
                <select className="form-control"  value={this.state.search_type} onChange={this.onChangeSearch_type}> 
                    <option name="FT" value="FT">FT</option>
                    <option name="PT" value="PT">PT</option>
                    <option name="WFH" value="WFH">WFH</option>                    
                </select>
                <br></br>
                <label>Maximum Duration (show jobs strictly less than this value): </label>
                <select className="form-control"  value={this.state.search_duration} onChange={this.onChangeSearch_duration}> 
                    <option name="1" value="1">1</option>
                    <option name="2" value="2">2</option>
                    <option name="3" value="3">3</option>
                    <option name="4" value="4">4</option>
                    <option name="5" value="5">5</option>
                    <option name="6" value="6">6</option>
                    <option name="7" value="7">7</option>                    
                </select>
                <br></br>
                <label>Salary min: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.search_salary_x}
                               onChange={this.onChangeSearch_salary_x}
                        />
                <label>Salary max: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.search_salary_y}
                               onChange={this.onChangeSearch_salary_y}
                        />
                <br></br>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job title</th>
                            <th>Salary</th>
                            <th>Duration</th>
                            <th>Recruiter</th>
                            <th>Rating</th>
                            <th>Deadline for application</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {

                        this.state.jobs.map((Job, i) => {
                            console.log(Job.recruiter);
                            // let avg_rating = 0;
                            // avg_rating = Job.sum_of_rating / (Job.positions - Job.remaining_positions);
                            if(Job.show==1)
                            {
                                if(Job.full == 1)
                                {    
                                    return (
                                        <tr key={i}>
                                            <td>{Job.title}</td>
                                            <td>{Job.salary} </td>
                                            <td>{Job.duration}</td>
                                            <td><Link to={{ pathname: '/recruiter', state: { id: Job.recruiter._id, name: Job.recruiter.name} }}>{Job.recruiter.name} </Link></td>
                                            <td>{Job.rating}</td>
                                            <td>{Job.deadline_for_application}</td>                                    
                                            {/* <form onSubmit={this.onOrder}> */}
                                            {/* <td><input type="number"  min="1" value={this.state.quantity} onChange={this.onChangeQuantity}/> </td> */}
                                            <td><button type="button" class="btn btn-danger">Full</button></td>
                                            {/* <td><Button color="#ff5c5c" variant="primary" >Full</Button></td> */}
                                          
                                        </tr>
                                    )
                                }
                                else if(Job.applied == 1)
                                {
                                    return (
                                        <tr key={i}>
                                            <td>{Job.title}</td>
                                            <td>{Job.salary} </td>
                                            <td>{Job.duration}</td>
                                            <td><Link to={{ pathname: '/recruiter', state: { id: Job.recruiter._id, name: Job.recruiter.name} }}>{Job.recruiter.name} </Link></td>
                                            <td>{Job.rating}</td>
                                            <td>{Job.deadline_for_application}</td>                                    
                                            {/* <form onSubmit={this.onOrder}> */}
                                            {/* <td><input type="number"  min="1" value={this.state.quantity} onChange={this.onChangeQuantity}/> </td> */}
                                            <td><button type="button" class="btn btn-warning">Applied</button></td>
                                            {/* <Button color="#ffae5c">Applied</Button> */}
                                           {/* <td><Button color="#ffae5c" title="Applied"/></td> */}
                                        </tr>
                                    )
                                }
                                else{
                                    return (
                                        <tr key={i}>
                                            <td>{Job.title}</td>
                                            <td>{Job.salary} </td>
                                            <td>{Job.duration}</td>
                                            <td><Link to={{ pathname: '/recruiter', state: { id: Job.recruiter._id, name: Job.recruiter.name} }}>{Job.recruiter.name} </Link></td>
                                            <td>{Job.rating}</td>
                                            <td>{Job.deadline_for_application}</td>                                    
                                            {/* <form onSubmit={this.onOrder}> */}
                                            {/* <td><input type="number"  min="1" value={this.state.quantity} onChange={this.onChangeQuantity}/> </td> */}
                                            <Link to={{ pathname: '/sop/'+Job._id }}>
                                                {/* , state: { id: Job._id} }}> */}
                                            <td><Button variant="primary">Apply</Button></td>    
                                            {/* <td><Button variant="primary" onClick={() => {this.placeApplication(Job._id) }}>Apply</Button></td> */}
                                            </Link>
                                        </tr>
                                    )
                                }
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
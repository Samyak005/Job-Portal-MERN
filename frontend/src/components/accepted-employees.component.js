import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export default class AcceptedEmployees extends Component {
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);

        this.sortbyRating = this.sortbyRating.bind(this);
        this.sortbyTitle = this.sortbyTitle.bind(this); 
        this.sortbyName = this.sortbyName.bind(this);
        this.sortbyDate = this.sortbyDate.bind(this);

        this.sortbyRatingA = this.sortbyRatingA.bind(this);
        this.sortbyTitleA = this.sortbyTitleA.bind(this); 
        this.sortbyNameA = this.sortbyNameA.bind(this);
        this.sortbyDateA = this.sortbyDateA.bind(this); 

        this.state = {
            listings: [],
            rate: ''
        }
    }

    onChangeRate(e) {
        this.setState({ rate: e.target.value });
    }

    componentDidMount() {

        axios.get('http://localhost:4000/api/accepted_employees/'+localStorage.getItem('user_id'))
            .then(response => {
                console.log(response.data);
                this.setState({listings: response.data});
                // console.log(this.state.listings);
            })
            .catch(function(error) {
                // if(error.response)
                    // alert(error.response.data);
                console.log(error);
            })
    }

    onSubmit(e, id) {
        e.preventDefault();
        // let token = localStorage.getItem('token');
        // console.log(token);
        const Application = {
            _id: id,
            rate: this.state.rate
        }
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': token
        // }    

        axios.post('http://localhost:4000/api/employee_rating',Application)
        //  {headers: headers})
            .then(response => { console.log(response.data)})
            .catch(err => {
                if(err.response)
                    alert(err.response.data.message);
                console.log(err)});
        
        setTimeout(function(){window.location.reload()},3000);
        // window.setTimeout(function(){location.reload()},3000)
        // window.location.reload();
    }

    // RateEmployee = this.RateEmployee;

    // RateEmployee(id, event) {
    //     // this.setState({ rate: event.target.value });
    //     let x = this.state.rate;
    //     console.log("rating received" + x);
    //     let token = localStorage.getItem('token');
    //     console.log(token);
    //     const Application = {
    //         _id: id,
    //         rate: x
    //     }
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': token
    //     }    
    //     // axios.post('http://localhost:4000/api/application/accept',Application, {'type': x}, {headers: headers})
    //     axios.post('http://localhost:4000/api/employee_rating',Application, {headers: headers})
    //         .then(response => { console.log(response.data)})
    //         .catch(err => {
    //             if(err.response)
    //                 alert(err.response.data.message);
    //             console.log(err)});
    
    //     // window.location.reload();
    // }

    sortbyTitle = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].if_job_title;
                var left2 = listings[j+1].if_job_title;
                var com = left.localeCompare(left2);
                if(com==-1)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyTitleA = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].if_job_title;
                var left2 = listings[j+1].if_job_title;
                var com = left.localeCompare(left2);
                if(com==1)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyRating = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].rating; // can be listings[j].recruiter.rating
                var left2 = listings[j+1].rating;
                if(left < left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyRatingA = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].rating; // can be listings[j].recruiter.rating
                var left2 = listings[j+1].rating;
                if(left > left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyName = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].name;
                var left2 = listings[j+1].name;
                var com = left.localeCompare(left2);
                if(com==-1)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyNameA = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].name;
                var left2 = listings[j+1].name;
                var com = left.localeCompare(left2);
                if(com==1)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyDate = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].if_job_date_of_joining;
                var left2 = listings[j+1].if_job_date_of_joining;
                if(left < left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyDateA = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].if_job_date_of_joining;
                var left2 = listings[j+1].if_job_date_of_joining;
                if(left > left2)
                {
                    var temp = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temp;
                }
            }
        }
        this.setState({listings: listings});
    }

    render() {
        return (
            <div>
                <Button variant="info" onClick={this.sortbyName} >Order by Name Descending</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyTitle} >Order by Title Descending</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyDate} >Order by Date Descending</Button>
                <Button variant="info" onClick={this.sortbyRating} >Order by Applicant Rating Descending</Button>
                
                <br></br>
                <Button variant="info" onClick={this.sortbyNameA} >Order by Name Ascending</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyTitleA} >Order by Title Ascending</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyDateA} >Order by Date Ascending</Button>
                <Button variant="info" onClick={this.sortbyRatingA} >Order by Applicant Rating Ascending</Button>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee's Name</th>
                            <th>Job Type</th>
                            <th>Date of joining</th>
                            <th>Job Title</th>
                            <th>Rating</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((User, i) => {
                            return (
                                <tr key={i}>
                                    <td>{User.name}</td>
                                    <td>{User.if_job_type}</td>
                                    <td>{User.if_job_date_of_joining}</td>
                                    <td>{User.if_job_title}</td>
                                    <td>{User.rating}</td>
                                    {/* <div className="form-group">
                                        <select className="form-control"  value={this.state.rate} onChange={this.RateEmployee(Application._id)}> 
                                            <option name="1" value="1">1</option>
                                            <option name="2" value="2">2</option>
                                            <option name="3" value="3">3</option>
                                            <option name="4" value="4">4</option>
                                            <option name="5" value="5">5</option>
                                            
                                        </select>
                                    </div> */}
                                    <td>
                                    <form onSubmit={ e => this.onSubmit(e, User._id)}>
                                        <div className="form-group">
                                            {/* <label>SOP: </label> */}
                                            <input type="text" 
                                                className="form-control" 
                                                value={this.state.rate}
                                                onChange={this.onChangeRate}
                                                />  
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Submit" className="btn btn-primary"/>
                                        </div>
                                    </form>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

export default class Listings extends Component {
    
    constructor(props) {
        super(props);
        this.deleteJob = this.deleteJob.bind(this)
        this.state = {listings: []}
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    

        axios.post('http://localhost:4000/api/jobs/view',{'type': 1}, { headers: headers} )
             .then(response => {
                console.log(response.data)
                this.setState({listings: response.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                alert(error.response.data.message);
                 console.log(error);
             })
    }


    deleteJob(id) {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        axios.post('http://localhost:4000/api/jobs/delete/',{'id': id}, {headers: headers})
          .then(response => { console.log(response.data)});
    
        this.setState({
          listings: this.state.listings.filter(el => el._id !== id)
        })
    }

    deleteJob = this.deleteJob;

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date of Posting</th>
                            <th>Number of Applicants</th>
                            <th>Remaining Positions</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((job, i) => {
                            let left = 0;
                            if(job.positions > job.no_applications) left = job.positions - job.no_applications; 
                            else left = 0;
                            return (
                                <tr key={i} deleteJob = {this.deleteJob}>
                                    <td><Link to={{ pathname: '/applications/recruiter_view/' + job._id}}>{job.title}</Link></td>
                                    <td>{job.date_of_posting}</td>
                                    <td>{job.no_applications}</td>
                                    <td>{job.remaining_positions}</td>
                                    {/* <td ><Link to={{ pathname: '/edit'+job._id, state: { 'id': job._id} }}>Edit</Link></td> */}
                                    <td ><Link to={{ pathname: '/edit/'+job._id}}>Edit</Link></td>
                                    <td> <Button variant="danger" onClick={() => {this.deleteJob(job._id) }}>Delete</Button></td>
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
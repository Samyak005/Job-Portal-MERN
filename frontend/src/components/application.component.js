import React, {Component} from 'react';
import axios from 'axios';

export default class ApplicationsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {applications: [], rate: ''};
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeRate(e) {
        this.setState({ rate: e.target.value });
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }    

        axios.get('http://localhost:4000/api/applications/view' ,{ headers: headers} )
             .then(res => {
                console.log(res.data)
                this.setState({applications: res.data});
             })
             .catch(function(error) {
                if(error.response.data.message)
                    alert(error.response.data.message);
                console.log(error);
             })
    }

    onSubmit(e, id) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        console.log(token);
        const Application = {
            _id: id,
            rate: this.state.rate
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    

        axios.post('http://localhost:4000/api/job_rating',Application, {headers: headers})
            .then(response => { console.log(response.data)})
            .catch(err => {
                if(err.response)
                    alert(err.response.data.message);
                console.log(err)});

        // window.location.reload();
        setTimeout(function(){window.location.reload()},3000);
        // window.setTimeout(
        //     function(){
        //       location.reload(true)
        //     },
        //     3000
        //   );
    }

    render() {
        let user = localStorage.getItem('user_name');
        return (
            <div>
                <h2>{user}'s applications:</h2>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Status</th>
                            <th>Date of Joining</th>
                            <th>Salary</th>
                            <th>Recruiter name</th>
                            <th>Rating</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.applications.map((Application, i) => {
                            if(Application.status == "Accepted")
                            return (
                                <tr key={i}>
                                    <td>{Application.job.title}</td>
                                    <td>{Application.status} </td>
                                    <td>{Application.job.deadline_for_application} </td>
                                    <td>{Application.job.salary} </td>
                                    <td>{Application.job.recruiter.name} </td>
                                    <td>{Application.job.rating} </td>
                                    <td>
                                    <form onSubmit={ e => this.onSubmit(e, Application._id)}>
                                        <div className="form-group">
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

                            else 
                            return (
                                <tr key={i}>
                                    <td>{Application.job.title}</td>
                                    <td>{Application.status} </td>
                                    <td>{Application.job.deadline_for_application} </td>
                                    <td>{Application.job.salary} </td>
                                    <td>{Application.job.recruiter.name} </td>
                                    <td>{Application.job.rating} </td>
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
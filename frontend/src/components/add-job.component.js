import React, {Component} from 'react';
import axios from 'axios';

export default class AddJob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            positions:'',
            salary: '',
            type: '',
            duration: '',
            skillset: '',
            deadline_for_application: '',
            max_no_applications: ''
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePositions = this.onChangePositions.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeSkillset = this.onChangeSkillset.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeMax_applications = this.onChangeMax_applications.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangePositions(event) {
        this.setState({ positions: event.target.value });
    }

    onChangeSalary(event) {
        this.setState({ salary: event.target.value });
    }
    
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }
    
    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }
    
    onChangeSkillset(event) {
        this.setState({ skillset: event.target.value });
    }
    
    onChangeDeadline(event) {
        this.setState({ deadline_for_application: event.target.value });
    }
    
    onChangeMax_applications(event) {
        this.setState({ max_no_applications : event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            title: this.state.title,
            positions: this.state.positions,
            salary:  this.state.salary,
            type:  this.state.type,
            duration:  this.state.duration,
            deadline_for_application:  this.state.deadline_for_application,
            skillset:  this.state.skillset,
            max_no_applications: this.state.max_no_applications
        }

        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        console.log(newJob);
        axios.post('http://localhost:4000/api/jobs/add', newJob, {headers: headers})
            .then(res => 
                {
                    alert("Job successfully added");
                    console.log(res.data)
                })
            .catch(function(error) {
                if(error.response.data.message)
                    alert(error.response.data.message);
                console.log(error);
            })
        this.setState({
            title: '',
            positions: '',
            salary: '',
            type: '',
            duration: '',
            skillset: '',
            deadline_for_application: '',
            max_no_applications: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangeSalary}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Positions: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.positions}
                               onChange={this.onChangePositions}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Max applications: </label>
                        <input type="number" min={this.state.positions}
                               className="form-control" 
                               value={this.state.max_no_applications}
                               onChange={this.onChangeMax_applications}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.type}
                               onChange={this.onChangeType}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="number" min="0" max="6"
                               className="form-control" 
                               value={this.state.duration}
                               onChange={this.onChangeDuration}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Skill Set: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.skillset}
                               onChange={this.onChangeSkillset}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="date" 
                               className="form-control" 
                               value={this.state.deadline_for_application}
                               onChange={this.onChangeDeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add listing" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
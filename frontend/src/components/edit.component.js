import React, {Component} from 'react';
import axios from 'axios';


export default class Edit extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            // id : this.props.match.params.id,
            positions:'',
            deadline_for_application: '',
            max_no_applications: ''
        }
        this.onChangePositions = this.onChangePositions.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeMax_applications = this.onChangeMax_applications.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/jobs/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    deadline_for_application: response.data.deadline_for_application,
                    positions: response.data.positions,
                    max_no_applications: response.data.max_no_applications
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeDeadline(e) {
        this.setState({ deadline_for_application: e.target.value });
    }

    onChangePositions(e) {
        this.setState({ positions: e.target.value });
    }

    onChangeMax_applications(e) {
        this.setState({ max_no_applications : e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const edit = {
            // id: this.state._id,
            positions: this.state.positions,
            deadline_for_application: this.state.deadline_for_application,
            max_no_applications: this.state.max_no_applications
        }
        
        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }   

        axios.post('http://localhost:4000/api/jobs/edit/'+this.props.match.params.id, edit, {headers: headers})
            .then(response => {
                console.log(response.data);
                // localStorage.setItem('token', response.data.token.token);
                // localStorage.setItem('user_type', response.data.token.user.type);
                // localStorage.setItem('user_name', response.data.token.user.username);
                // localStorage.setItem('user_id', response.data.token.user._id);
                this.props.history.push("/");

                window.location.reload();
            })
            .catch(err => {
                if(err.response)
                    alert(err.response.data);
                console.log(err.response);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New number of positions: </label>
                        <input type="number" min="1" 
                               className="form-control" 
                               value={this.state.positions}
                               onChange={this.onChangePositions}
                               />
                        <label>New number of max applications: </label>
                        <input type="number" min={this.state.positions} 
                               className="form-control" 
                               value={this.state.max_no_applications}
                               onChange={this.onChangeMax_applications}
                               />  
                        <label>New deadline: </label>
                        <input type="date"  
                               className="form-control" 
                               value={this.state.deadline_for_application}
                               onChange={this.onChangeDeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
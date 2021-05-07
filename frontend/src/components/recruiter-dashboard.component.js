import React, {Component} from 'react';
import axios from 'axios';

export default class RecruiterDashboard extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            emailid:'',
            contact_number:'',
            bio:''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/api/user/'+localStorage.getItem('user_id'))
            .then(response => {
                this.setState({
                    name: response.data.name,
                    emailid: response.data.emailid,
                    contact_number: response.data.contact_number,
                    bio: response.data.bio
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeEmail(e) {
        this.setState({ emailid: e.target.value });
    }

    onChangeContact(e) {
        this.setState({ contact_number: e.target.value });
    }

    onChangeBio(e) {
        this.setState({ bio: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const edit = {
            name: this.state.name,
            emailid: this.state.emailid,
            contact_number:  this.state.contact_number,
            bio: this.state.bio
        }

        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        console.log(edit);
        axios.post('http://localhost:4000/api/recruiter/dashboard', edit, {headers: headers})
            .then(res => 
                {
                    alert("Recruiter profile updated");
                    console.log(res.data);

                    window.location.reload();
                })
            .catch(function(error) {
                if(error.response)
                    alert(error.response.data.message);
                console.log(error);
            })
        // this.setState({
        //     name: '',
        //     emailid:'',
        //     my_skills:''
        // });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>EmailID: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.emailid}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input type="number" min='1000000000' max='9999999999'
                               className="form-control" 
                               value={this.state.contact_number}
                               onChange={this.onChangeContact}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangeBio}
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
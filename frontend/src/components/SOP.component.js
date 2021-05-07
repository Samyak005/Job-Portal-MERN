import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom';
import { Route } from "react-router-dom";

export default class SOP extends Component {
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSOP = this.onChangeSOP.bind(this);
        // this.placeApplication = this.placeApplication.bind(this);
        this.state = {
            sop: ''
        }
    }

    onChangeSOP(e) {
        this.setState({ sop: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        console.log(token);
        const Application = {
            job: this.props.match.params.id,
            applicant : localStorage.getItem('user_id'),
            sop : this.state.sop
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
                alert(err.response.data);
            // console.log(err)
        });
    
        this.setState({
          sop : ''
        });

        // <Link to={{pathname : '/applicant/dashboard'}} />
        return <Redirect to="/applicant/dashboard"/>
        // <Route exact path="/applicant/dashboard">
        //     <Redirect to="/applicant/dashboard"/>
        // </Route>
        

        // <Link to="/applicant/dashboard"/>
        
        // window.location.reload();
    }

    // placeApplication() {
    //     const SOP = {
    //         sop: this.state.sop,
    //     }

    //     console.log(SOP);
    //     axios.post('http://localhost:4000/api/sop/'+this.props.match.params.id, SOP)
    //          .then(res => {
    //             console.log(res.data);
    //         })
    //          .catch(err =>
    //             {
    //                 if(err.data)
    //                     alert(err.data);
    //                 console.log(err)
    //             });

    //     // this.setState({
    //     //     search : '',
    //     //     search_salary_x:0,
    //     //     search_salary_y:0,
            
    //     //     search_duration:0,
    //     //     search_type:'Type'
    //     // });
    // }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>SOP: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.sop}
                               onChange={this.onChangeSOP}
                               />  
                    </div>

                    {/* <Button variant="primary" onClick={() => {this.placeApplication() }}>Apply</Button> */}

                    {<div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>}
                </form>
            </div>
        )
    }
}
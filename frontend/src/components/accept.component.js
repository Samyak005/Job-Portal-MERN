import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export default class Accept extends Component {
    
    constructor(props) {
        super(props);
        this.applicationAccept = this.applicationAccept.bind(this);
        this.state = {listings: []}
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    

        // axios.post('http://localhost:4000/api/jobs/view',{'type': 2},{ headers: headers} )
        //     .then(response => {
        //         console.log(response.data);
        //         this.setState({listings: response.data});
        //     })
        //     .catch(function(error) {
        //         if(error.response.data.message)
        //             alert(error.response.data.message);
        //         console.log(error);
        //     })

        axios.get('http://localhost:4000/api/applications/recruiter_view/'+this.props.match.params.id,{ headers: headers} )
            .then(response => {
                console.log(response.data);
                this.setState({listings: response.data});
            })
            .catch(function(error) {
                if(error.response)
                    alert(error.response.data);
                console.log(error);
            })
    }

    applicationAccept = this.applicationAccept;

    applicationAccept(id, x) {
        console.log(x);
        let token = localStorage.getItem('token');
        console.log(token);
        const Application = {
            _id: id,
            type: x,
            rec_id: localStorage.getItem('user_id')
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        // axios.post('http://localhost:4000/api/application/accept',Application, {'type': x}, {headers: headers})
        axios.post('http://localhost:4000/api/application/accept',Application, {headers: headers})
            .then(response => { console.log(response.data)})
            .catch(err => {
                if(err.response)
                    alert(err.response.data);
                console.log(err)});
    
        // window.location.reload();
        setTimeout(function(){window.location.reload()},2000);
    }

    sortbyDate = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].date_of_application;
                var left2 = listings[j+1].date_of_application;
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
                var left = listings[j].date_of_application;
                var left2 = listings[j+1].date_of_application;
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

    sortbyRating = () =>{
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var left = listings[j].applicant.rating; // can be listings[j].recruiter.rating
                var left2 = listings[j+1].applicant.rating;
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
                var left = listings[j].applicant.rating; // can be listings[j].recruiter.rating
                var left2 = listings[j+1].applicant.rating;
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
                var left = listings[j].applicant.name;
                var left2 = listings[j+1].applicant.name;
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
                var left = listings[j].applicant.name;
                var left2 = listings[j+1].applicant.name;
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

    render() {
        return (
            <div>
                <Button variant="info" onClick={this.sortbyName} >Order by Name Descending</Button> 
                <Button variant="info" onClick={this.sortbyDate} >Order by Date Descending</Button>
                <Button variant="info" onClick={this.sortbyRating} >Order by Applicant Rating Descending</Button>
                
                <br></br>
                <Button variant="info" onClick={this.sortbyNameA} >Order by Name Ascending</Button> 
                <Button variant="info" onClick={this.sortbyDateA} >Order by Date Ascending</Button>
                <Button variant="info" onClick={this.sortbyRatingA} >Order by Applicant Rating Ascending</Button>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant's name</th>
                            <th>Skills</th>
                            <th>Date of application</th>
                            <th>Education</th>
                            <th>SOP</th>
                            <th>Rating</th>
                            <th>Stage of Application</th>
                            <th>CV</th>
                            <th>DP</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((Application, i) => {
                            if(Application.status=="Shortlisted")
                            {
                                return (
                                    
                                    <tr key={i}>
                                        <td>{Application.applicant.name}</td>
                                        <td>{Application.applicant.my_skills}</td>
                                        <td>{Application.date_of_application}</td>
                                        <td>{Application.applicant.education}</td>
                                        <td>{Application.sop}</td>
                                        <td>{Application.applicant.rating}</td>
                                        <td>{Application.status}</td>
                                        <td><a href={`http://localhost:3001/my_files/files/${Application.applicant.filename}`}>{Application.applicant.filename}</a></td>
                                        <td><a href={`http://localhost:3001/my_files/files/${Application.applicant.imagename}`}>{Application.applicant.imagename}</a></td>
                                        {/* <td><img src={Application.applicant.image} className="mx-2 card-pic" width="100%"/></td> */}
                                        {/* <td><a href={Application.applicant.cv} download>Download CV</a></td> */}
                                        <td><Button variant="warning" onClick={() => {this.applicationAccept(Application._id, 1) }}>Accept</Button></td>
                                        <td><Button variant="warning" onClick={() => {this.applicationAccept(Application._id, 2) }}>Reject</Button></td>
                                        
                                    </tr>
                                    // <form action={Application.applicant.cv} method="GET"><input type="submit" value="Download"></form>
                                )
                            }
                            else if(Application.status=="Applied")
                            {
                                return (
                                    
                                    <tr key={i}>
                                        <td>{Application.applicant.name}</td>
                                        <td>{Application.applicant.my_skills}</td>
                                        <td>{Application.date_of_application}</td>
                                        <td>{Application.applicant.education}</td>
                                        <td>{Application.sop}</td>
                                        <td>{Application.applicant.rating}</td>
                                        <td>{Application.status}</td>
                                        <td><a href={`http://localhost:3001/my_files/files/${Application.applicant.filename}`}>{Application.applicant.filename}</a></td>
                                        <td><a href={`http://localhost:3001/my_files/files/${Application.applicant.imagename}`}>{Application.applicant.imagename}</a></td>
                                        {/* <td><img src={Application.applicant.image} className="mx-2 card-pic" width="100%"/></td> */}
                                        {/* <td><a href={Application.applicant.cv} download>Download CV</a></td> */}
                                        <td><Button variant="warning" onClick={() => {this.applicationAccept(Application._id, 3) }}>Shortlist</Button></td>
                                        <td><Button variant="warning" onClick={() => {this.applicationAccept(Application._id, 2) }}>Reject</Button></td>
                                        
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
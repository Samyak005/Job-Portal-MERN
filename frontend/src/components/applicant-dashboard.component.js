import React, {Component} from 'react';
import axios from 'axios';

export default class ApplicantDashboard extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            emailid:'',
            my_skills:'',
            education: '',
            // image: null,
            // cv: null,
            files: [],
            file: '',
            file_id: '',
            filename: '',
            if_file: 0,
            if_image: 0,
            imagename: '',
            image_id: '',
            image: ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        // this.onChangeImage = this.onChangeImage.bind(this);
        // this.onChangeCV = this.onChangeCV.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadFiles = this.loadFiles.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.loadFiles2 = this.loadFiles2.bind(this);
        this.fileChanged2 = this.fileChanged2.bind(this);
        this.deleteFile2 = this.deleteFile2.bind(this);
        this.uploadFile2 = this.uploadFile2.bind(this);
    }
  
    loadFiles() {
        let edit = {
            id: this.state.file_id
        }
        console.log(this.state.file_id);
    
      axios.post('http://localhost:3001/my_files/files2', edit)
        .then(file => {
          if (file) {
            this.setState({ file: file })
            this.setState({ if_file: 1 })
          } else {
            console.log('No Files');
            this.setState({ file: '' })
          }
        })
        .catch(err => console.log("No file"));

        // axios.get('http://localhost:3001/my_files/files2/'+this.state.filename)
        // .then(response => {
        //     console.log(JSON.stringify(response));
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
        //   .then(res => res.json())
        //   .then(function (files) {
        //     if (files.message) {
        //     console.log('No Files');
        //     this.setState({ files: [] })
        //     } 
        //     console.log(JSON.stringify(files));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }
  
    fileChanged(event) {
      const f = event.target.files[0];
      this.setState({
        file: f
      });
    }
  
    deleteFile(event) {
      event.preventDefault();
      const id = event.target.id;
  
      fetch('http://localhost:3001/my_files/files/'+id, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(response => {
          console.log(response);
          if (response.success) 
          {
            this.setState({ file: '' })
            this.setState({ if_file: 0 })
            this.setState({ filename : '' })
            this.setState({ file_id : '' })          
          }
          else alert('Delete Failed');
        })
    }
  
    uploadFile(event) {
      event.preventDefault();
      let data = new FormData();
      data.append('file', this.state.file);
  
      fetch('http://localhost:3001/my_files/files', {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(data => {
            
          if (data.success) {
            let file_id = data.file.id;
            let filename = data.file.filename;
            let edit = {
                file_id: data.file.id,
                filename: data.file.filename
            }

            this.setState({ file_id: file_id });
            this.setState({ filename: filename });
            console.log(this.state.file_id);

            axios.post('http://localhost:4000/api/user_fileid/'+localStorage.getItem('user_id'), edit)
            .then(response => {
                console.log('user updated');
            })
            .catch(function (error) {
                console.log(error);
            })

            this.loadFiles();
            // window.location.reload();
          } else {
            alert('Upload failed');
          }
        });
    }

    loadFiles2() {
        let edit = {
            id: this.state.image_id
        }
        console.log(this.state.image_id);
    
      axios.post('http://localhost:3001/my_files/files2', edit)
        .then(image => {
          if (image) {
            this.setState({ image: image })
            this.setState({ if_image: 1 })
          } else {
            console.log('No Image');
            this.setState({ image: '' })
          }
        })
        .catch(err => console.log("No Image"));
    }
  
    fileChanged2(event) {
      const f = event.target.files[0];
      this.setState({
        image: f
      });
    }
  
    deleteFile2(event) {
      event.preventDefault();
      const id = event.target.id;
  
      fetch('http://localhost:3001/my_files/files/'+id, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(response => {
          console.log(response);
          if (response.success) 
          {
            this.setState({ image: '' })
            this.setState({ if_image: 0 })
            this.setState({ imagename : '' })
            this.setState({ image_id : '' })          
          }
          else alert('Delete Failed');
        })
    }
  
    uploadFile2(event) {
      event.preventDefault();
      let data = new FormData();
      data.append('file', this.state.image);
  
      fetch('http://localhost:3001/my_files/files4', {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(data => {
            
          if (data.success) {
            let image_id = data.file.id;
            let imagename = data.file.filename;
            let edit = {
                image_id: data.file.id,
                imagename: data.file.filename
            }

            this.setState({ image_id: image_id });
            this.setState({ imagename: imagename });
            console.log(this.state.image_id);

            axios.post('http://localhost:4000/api/user_imageid/'+localStorage.getItem('user_id'), edit)
            .then(response => {
                console.log('user updated');
            })
            .catch(function (error) {
                console.log(error);
            })

            this.loadFiles2();
            // window.location.reload();
          } else {
            alert('Upload failed');
          }
        });
    }

    componentDidMount() {

        axios.get('http://localhost:4000/api/user/'+localStorage.getItem('user_id'))
            .then(response => {
                console.log(response.data);
                this.setState({
                    name: response.data.name,
                    emailid: response.data.emailid,
                    my_skills: response.data.my_skills,
                    education: response.data.education,
                    file_id: response.data.file_id,
                    filename: response.data.filename,
                    imagename: response.data.imagename,
                    image_id: response.data.image_id,
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
        
        setTimeout(() => {
            this.loadFiles();
            this.loadFiles2();
            }, 2000);
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeEmail(e) {
        this.setState({ emailid: e.target.value });
    }

    onChangeSkills(e) {
        this.setState({ my_skills: e.target.value });
    }

    onChangeEducation(e) {
        this.setState({ education: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const edit = {
            name: this.state.name,
            emailid: this.state.emailid,
            my_skills:  this.state.my_skills,
            education:  this.state.education,
        }

        let token = localStorage.getItem('token');
        console.log(token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }    
        console.log(edit);
        axios.post('http://localhost:4000/api/applicant/dashboard', edit, {headers: headers})
            .then(res => 
                {
                    alert("Applicant profile updated");
                    console.log(res.data);

                    window.location.reload();
                })
            .catch(function(error) {
                if(error.response.data.message)
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
        if((this.state.if_file) && (this.state.if_image))
        {
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
                        <label>Email ID: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.emailid}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.my_skills}
                               onChange={this.onChangeSkills}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Education: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.education}
                               onChange={this.onChangeEducation}
                               />  
                    </div>
                    {/* <div className="form-group">
                        <label>fileid: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.file_id}
                               />  
                    </div> */}
                    {/* <div className="form-group">
                        <label>Profile Image: </label>
                            {/* <input type="file"
                               className="form-control" 
                               id="img"
                               value={this.state.image}
                               onChange={this.onChangeImage}
                               />   */}
                             {/* <input type="file" onChange={this.fileChanged.bind(this)}/>
                            <button onClick={this.uploadFile.bind(this)}>Upload</button>
                            <a href={`http://localhost:3001/api/files/${file.filename}`}>{file.filename}</a>
                        <button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button> */}
                
                <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary"/>
                    </div>
                </form>

                    <div className="form-group">
                        <label>CV (PDF): </label>
                        <br></br>
                        <input type="file" onChange={this.fileChanged.bind(this)}/>
                            <button onClick={this.uploadFile.bind(this)}>Upload</button>
                        
                            <td><a href={`http://localhost:3001/my_files/files/${this.state.filename}`}>{this.state.filename}</a></td>
                            <td><button onClick={this.deleteFile.bind(this)} id={this.state.file_id}>Remove</button></td>
                        
                    </div>
                    <div className="form-group">
                        <label>Image(JPG/PNG): </label>
                        <br></br>
                        <input type="file" onChange={this.fileChanged2.bind(this)}/>
                            <button onClick={this.uploadFile2.bind(this)}>Upload</button>
                            <td><a href={`http://localhost:3001/my_files/files/${this.state.imagename}`}>{this.state.imagename}</a></td>
                            <td><button onClick={this.deleteFile2.bind(this)} id={this.state.image_id}>Remove</button></td>
                        
                    </div>
                    
            </div>
        )
    }

else if(this.state.if_file){
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
                    <label>Email ID: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.emailid}
                           onChange={this.onChangeEmail}
                           />  
                </div>
                <div className="form-group">
                    <label>Skills: </label>
                    <input type="text"
                           className="form-control" 
                           value={this.state.my_skills}
                           onChange={this.onChangeSkills}
                           />  
                </div>
                <div className="form-group">
                    <label>Education: </label>
                    <input type="text"
                           className="form-control" 
                           value={this.state.education}
                           onChange={this.onChangeEducation}
                           />  
                </div>
                {/* <div className="form-group">
                    <label>fileid: </label>
                    <input type="text"
                           className="form-control" 
                           value={this.state.file_id}
                           />  
                </div> */}
                {/* <div className="form-group">
                    <label>Profile Image: </label>
                        {/* <input type="file"
                           className="form-control" 
                           id="img"
                           value={this.state.image}
                           onChange={this.onChangeImage}
                           />   */}
                         {/* <input type="file" onChange={this.fileChanged.bind(this)}/>
                        <button onClick={this.uploadFile.bind(this)}>Upload</button>
                        <a href={`http://localhost:3001/api/files/${file.filename}`}>{file.filename}</a>
                    <button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button> */}
            
            <div className="form-group">
                    <input type="submit" value="Edit" className="btn btn-primary"/>
                </div>
            </form>

                <div className="form-group">
                    <label>CV(PDF): </label>
                    <br></br>
                    <input type="file" onChange={this.fileChanged.bind(this)}/>
                        <button onClick={this.uploadFile.bind(this)}>Upload</button>
                        <td><a href={`http://localhost:3001/my_files/files/${this.state.filename}`}>{this.state.filename}</a></td>
                        <td><button onClick={this.deleteFile.bind(this)} id={this.state.file_id}>Remove</button></td>
                        
                </div>
                <div className="form-group">
                  <label>Image(JPG/PNG): </label>
                  <br></br>
                  <input type="file" onChange={this.fileChanged2.bind(this)}/>
                      <button onClick={this.uploadFile2.bind(this)}>Upload</button>
              </div>
                
        </div>
    )
}
else if(this.state.if_image){
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
                  <label>Email ID: </label>
                  <input type="text" 
                         className="form-control" 
                         value={this.state.emailid}
                         onChange={this.onChangeEmail}
                         />  
              </div>
              <div className="form-group">
                  <label>Skills: </label>
                  <input type="text"
                         className="form-control" 
                         value={this.state.my_skills}
                         onChange={this.onChangeSkills}
                         />  
              </div>
              <div className="form-group">
                  <label>Education: </label>
                  <input type="text"
                         className="form-control" 
                         value={this.state.education}
                         onChange={this.onChangeEducation}
                         />  
              </div>
              {/* <div className="form-group">
                  <label>fileid: </label>
                  <input type="text"
                         className="form-control" 
                         value={this.state.file_id}
                         />  
              </div> */}
              {/* <div className="form-group">
                  <label>Profile Image: </label>
                      {/* <input type="file"
                         className="form-control" 
                         id="img"
                         value={this.state.image}
                         onChange={this.onChangeImage}
                         />   */}
                       {/* <input type="file" onChange={this.fileChanged.bind(this)}/>
                      <button onClick={this.uploadFile.bind(this)}>Upload</button>
                      <a href={`http://localhost:3001/api/files/${file.filename}`}>{file.filename}</a>
                  <button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button> */}
          
          <div className="form-group">
                  <input type="submit" value="Edit" className="btn btn-primary"/>
              </div>
          </form>

              <div className="form-group">
                  <label>CV(PDF): </label>
                  <br></br>
                  <input type="file" onChange={this.fileChanged.bind(this)}/>
                      <button onClick={this.uploadFile.bind(this)}>Upload</button>
              </div>
              <div className="form-group">
                  <label>Image(JPG/PNG): </label>
                  <br></br>
                  <input type="file" onChange={this.fileChanged2.bind(this)}/>
                      <button onClick={this.uploadFile2.bind(this)}>Upload</button>
                      <td><a href={`http://localhost:3001/my_files/files/${this.state.imagename}`}>{this.state.imagename}</a></td>
                      <td><button onClick={this.deleteFile2.bind(this)} id={this.state.image_id}>Remove</button></td>
                        
              </div>
              
      </div>
  )
}
else {
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
                  <label>Email ID: </label>
                  <input type="text" 
                         className="form-control" 
                         value={this.state.emailid}
                         onChange={this.onChangeEmail}
                         />  
              </div>
              <div className="form-group">
                  <label>Skills: </label>
                  <input type="text"
                         className="form-control" 
                         value={this.state.my_skills}
                         onChange={this.onChangeSkills}
                         />  
              </div>
              <div className="form-group">
                  <label>Education: </label>
                  <input type="text"
                         className="form-control" 
                         value={this.state.education}
                         onChange={this.onChangeEducation}
                         />  
              </div>

          <div className="form-group">
                  <input type="submit" value="Edit" className="btn btn-primary"/>
              </div>
          </form>

              <div className="form-group">
                  <label>CV(PDF): </label>
                  <br></br>
                  <input type="file" onChange={this.fileChanged.bind(this)}/>
                      <button onClick={this.uploadFile.bind(this)}>Upload</button>
              </div>
              <div className="form-group">
                  <label>Image(JPG/PNG): </label>
                  <br></br>
                  <input type="file" onChange={this.fileChanged2.bind(this)}/>
                      <button onClick={this.uploadFile2.bind(this)}>Upload</button>
              </div>
              
      </div>
  )
}
}}

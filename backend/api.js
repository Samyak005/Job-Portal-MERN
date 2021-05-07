const router = require('express').Router();
let User = require('./models/user');
let Job = require('./models/job');
let Token = require('./models/token');
let Application = require('./models/application');

// for authentication purpose
const bcrypt = require('bcrypt');

// Users

router.route('/users').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err));
});

function Authorize(req)
{
    const token = req.header('Authorization');
    // console.log('Authorization');
    // console.log(token);
    return Token.findOne({ token: token })
        .then(token => {
            if(!token) {return null;}
            // if(Date.now() > token.expire) {
            //     let user = token.user;
            //     token.delete();
            //     token = new Token({user});
            //     token.save();
            // }
            // console.log("whiopp");
            // console.log(token.user);
            return token.user;
        })
        .catch(err => {
            console.log("Error!");
            res.status(400).send(err);
        });
};


router.post('/users/add', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.status(400).send(err);
        else
        {
            let user = new User(req.body);
            user.password = hash;
            console.log(user);
            user.save()
            .then(user => {
                user.password = undefined;
                res.status(201).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        }
    });
});

router.post('/users/login', (req, res) => {
    let username = req.body.username, password = req.body.password;
    if(!username || !password) return res.status(400).send({'message': 'Please enter all fields'});

    User.findOne({ username: username })
        .then(user => {
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result){
                        Token.findOne({user})
                            .populate({
                                path: 'user'
                            })
                            .then(token => {
                                if(!token)
                                {
                                    token = new Token({user: user});
                                    token.save();
                                }
                                token.user.password = undefined;
                                token.expire = undefined;
                                token._id = undefined;
                                res.status(200).send({token});
                            })
                            .catch(err => {
                                res.status(400).send({'message': 'Token invalid'});
                            });
                    }
                    else res.status(400).send({'message': 'Password Incorrect'});
                });
            }
        else res.status(400).send({'message': "User not found"});
        })
        .catch(err => console.log(err));
});

router.route('/user/:id').get((req, res) => {
    // Authorize(req)
    // .then(user =>{
    //     if(!user) return res.status(400).json({'message': 'User not found'});
    //     User.findOne({_id: user})
    //         .then(user => {
    //             if(!user) 
    //             {
    //                 return res.status(400).json({'message': 'User not found'});
    //             }
    //             res.json(user);
    //         })
    //         .catch(err => {
    //             res.status(400).send(err);
    //         });
    // })
    // .catch(err => {
    //     res.status(400).send(err);
    // });  

    let id = req.params.id;
    
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

router.route('/user_fileid/:id').post((req, res) => {
    let id = req.params.id;
    
    User.findById(id, function(err, user) {
        user.file_id = req.body.file_id;
        user.filename = req.body.filename;
        user.save();
        console.log(user);
    });
});

router.route('/user_imageid/:id').post((req, res) => {
    let id = req.params.id;
    
    User.findById(id, function(err, user) {
        user.image_id = req.body.image_id;
        user.imagename = req.body.imagename;
        user.save();
        console.log(user);
    });
});

// Jobs

router.route('/jobs').get((req, res) => {
    Job.find()
      .then(jobs => res.json(jobs))
      .catch(err => res.status(400).json(err));
});

router.route('/applications').get((req, res) => {
    Application.find()
      .then(applications => res.json(applications))
      .catch(err => res.status(400).json(err));
});

router.route('/jobs/:id').get((req, res) => {
    let id = req.params.id;
    
    Job.findById(id, function(err, job) {
        res.json(job);
    });
});

// Add Jobs
router.post('/jobs/add', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                {
                    console.log("J");
                    return res.status(400).json({'message': 'User not found'});
                }
                if(user.type != "R") 
                {
                    console.log(user.type);
                    return res.status(401).json({'message': 'User not authorized'});
                }
                console.log(req);
                let job = new Job(req.body);
                job.remaining_positions = job.positions;
                console.log(job);
                job.recruiter = user;
                job.save()
                .then(job => {
                    res.status(201).json(job);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// Add Jobs
router.post('/applicant/dashboard', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                {
                    return res.status(400).json({'message': 'User not found'});
                }
                if(user.type != "J") 
                {
                    console.log(user.type);
                    return res.status(401).json({'message': 'User not authorized'});
                }
                console.log(req);
                user.my_skills = req.body.my_skills;
                user.name = req.body.name;
                user.emailid = req.body.emailid;
                user.education = req.body.education;

                user.save()
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

router.post('/recruiter/dashboard', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                {
                    return res.status(400).json({'message': 'User not found'});
                }
                if(user.type != "R") 
                {
                    console.log(user.type);
                    return res.status(401).json({'message': 'User not authorized'});
                }
                console.log(req);
                user.contact_number = req.body.contact_number;
                user.name = req.body.name;
                user.emailid = req.body.emailid;
                user.bio = req.body.bio;

                user.save()
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// View Jobs
router.post('/jobs/view', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "R") 
                    return res.status(401).json({'message': 'User not authorized'});
                
            if(req.body.type == 1)
            {
                Job.find({recruiter: user, isDeleted: false}) // jobs not accepted and not rejected
                .then( jobs => {
                    jobs.forEach(job => {
                        job.recruiter = undefined;
                    })
                    res.status(200).json(jobs)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            }

            // else if(req.body.type == 2) // for accepted applications 
            // {
            //     Job.find({recruiter: user, accepted: true, isDeleted: false})  
            //     .then( jobs => {
            //         jobs.forEach(job => {
            //             job.recruiter = undefined;
            //         })
            //         res.status(200).json(jobs)
            //     })
            //     .catch(err => {
            //         res.status(400).send(err);
            //     });
            // }
                
            })
            .catch(err => {1
                res.status(400).send(err);
            });
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '////////@gmail.com',
    pass: '///////'
  }
});

// Accept application
router.route('/application/accept').post((req, res)=> {

    console.log("In accept");
    console.log(req.body);
    let x = req.body.type;
    console.log(x);
    Application.findById(req.body._id)//, function(err, application){
    .populate('job')
    .populate('applicant')
    .then(application => {

            if(x==1){
                let applicant_reject_other = application.applicant;
                Application.find({applicant: applicant_reject_other})
                // .populate({
                //     path: 'job',
                //     populate: {
                //         path: 'recruiter'
                //     }
                // })
                // .populate('applicant')
                .populate([{
                    path: 'job',
                    populate: {
                        path: 'recruiter',
                        model: 'User'
                    },
                }, {
                    path: 'applicant',
                }])
                .then(applications => {
                    applications.forEach(application2 => {
                        
                        console.log(application2);
                        console.log(application2._id);
                        console.log(application._id);
                        let x1 = application2._id.toString()
                        console.log(x1);
                        let x2 = application._id.toString()
                        console.log(x2);

                        // if((((application2._id).toString()).localeCompare((application._id).toString()))==0)
                        // if((application2._id).equals(application._id))
                        // if((((application2._id).toHexString()).localeCompare((application._id).toHexString()))==0)
                        if(x2.localeCompare(x1)==0)
                        {
                            application.status = "Accepted"; 
                            console.log("Accepted");
                            application.applicant.if_got_a_job = 1;
                            application.applicant.if_job_recruiter = req.body.rec_id;
                            application.applicant.if_job_type = application.job.type;
                            application.applicant.if_job_title = application.job.title;
                            application.applicant.if_job_date_of_joining = new Date();
                            
                            console.log(application2.job.recruiter.name);
                            var mailOptions = {
                                from: '///////@gmail.com',
                                to: application.applicant.emailid,
                                subject: 'You Got a Job',
                                text: application2.job.recruiter.name + ' accepted your application',
                              };
                              
                            transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                            }); 

                            application.job.date_of_joining = new Date();
                            // application.applicant.open_applications -= 1; // was happening twice 
                            // application.job.no_applications -= 1;
                            application.job.remaining_positions -= 1;

                            console.log("reached");
                            application.job.save();
                            application.applicant.save();
                            application.save();
                            console.log("reached2");
                            
                            if(application.job.remaining_positions==0)
                            {
                                console.log("remaining positions become 0");
                                let job_reject_other = application.job;
                                Application.find({job: job_reject_other})
                                .populate('job')
                                .populate('applicant')
                                .then( applications2 => {
                                    applications2.forEach(application3 => {
                                        let x3 = application3._id.toString()
                                        console.log(x3);
                                        let x4 = application._id.toString()
                                        console.log(x4);

                                        if(x3.localeCompare(x4)!=0)
                                        {
                                            application3.status = "Rejected";
                                            application3.applicant.open_applications -= 1;
                                            application3.job.no_applications -= 1;

                                            application3.applicant.save();
                                            application3.job.save();
                                            application3.save();
                                        }
                                    }) 
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                            }
                        }
                        else
                        {
                            console.log("reached3");
                            application2.status = "Rejected";
                            application2.applicant.open_applications -= 1;
                            application2.job.no_applications -= 1;

                            application2.applicant.save();
                            application2.job.save();
                            console.log("Reject as already accept");
                            application2.save().then(new_application => {
                                console.log(new_application);
                            })
                            .catch(err => {
                                res.status(400).send("Update not possible");
                            });
                            console.log(application2);
                        }
                    }) 
                })
                .catch(err => {
                    res.status(400).send("couldn't find application");
                });

                // application.applicant.if_got_a_job = 1;
                // application.applicant.if_job_recruiter = req.body.rec_id;
                // application.applicant.if_job_type = application.job.type;
                // application.applicant.if_job_title = application.job.title;
                // application.applicant.if_job_date_of_joining = new Date();
                
                // application.job.date_of_joining = new Date();
                // // application.applicant.open_applications -= 1; // was happening twice 
                // // application.job.no_applications -= 1;

                // application.job.save();
                // application.applicant.save();
                // application.save();
            }
            else if(x==2){
                application.status = "Rejected"; 
                application.applicant.open_applications -= 1;
                application.job.no_applications -= 1;

                console.log("Rejected");
                application.applicant.save();
                application.job.save();
                application.save();
            }
            else if(x==3){
                application.status = "Shortlisted"; 
                application.applicant.open_applications -= 1;
                application.job.no_applications -= 1;

                console.log("Shortlisted");
                application.job.save();
                application.applicant.save();
                application.save();
            }
    })
    .catch(err => res.status(404).send("application is not found"));
});

// Delete
router.route('/jobs/delete').post((req, res)=> {
    console.log(req.body);
    console.log(req.headers);
    Authorize(req)
    .then(user =>{
        if(!user) 
        {
            // console.log("REEEE");
            return res.status(401).json({'message': 'User not found'});
        }
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                Job.findOne({ _id: req.body.id })
                .then(job => {
                    if(!job) return res.status(400).json({'message': 'job not found'});
                    if(!job.recruiter.equals(user._id)) 
                    {
                        console.log(job.recruiter, user._id)
                        return res.status(401).json({'message': 'User not authorized to perform this action'});
                    }
                    Application.find({job: job._id})
                    .populate([{
                        path: 'job',
                        populate: {
                            path: 'recruiter',
                            model: 'User'
                        },
                    }, {
                        path: 'applicant',
                    }])
                    .then( applications => {
                        applications.forEach(application => {
                            application.status = "Deleted";
                            application.applicant.if_got_a_job = 0;
                            application.applicant.save();
                            application.save();
                        }) 
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });

                    // User.find({if_got_a_job: 1, if_job_recruiter: job.recruiter})
                    // .then( users => {
                    //     users.forEach(user => {
                    //         user.status = "Deleted";
                    //         application.save();
                    //     }) 
                    // })
                    // .catch(err => {
                    //     res.status(400).send(err);
                    // });

                    job.isDeleted = true;
                    job.save();
                    res.status(200).json({'message': 'job deleted'});
                    
                })
                
                .catch(err => {
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
        
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

// take care of search filters
router.post('/jobs/search/:id', (req, res) => {

    let x = req.params.id;
    console.log(x);
    console.log(req.body);
    //prefixOnly: true
    let cur_date = new Date();
    Job.fuzzySearch({ query: req.body.name, minSize: 0 },{ isDeleted: false, type:req.body.type, deadline_for_application: {$gt: cur_date}})
    // Job.find({title: req.body.name, accepted: false, isDeleted: false, type:req.body.type})//, function(err, jobs){
    .populate({
        path: 'recruiter',
    })
    // }).sort({salary: 1})
    .then(jobs => {
        jobs.forEach(job => {

            job.applied = false;
            console.log(job._id);
            console.log(x);

            Application.findOne({job: job._id, applicant: x}, function(err,application){
            // .then(application) => {
                if(application)
                {
                    console.log(application);
                    console.log(application.status);
                    if(application.status!="Not Applied")
                    {
                        job.applied = true;
                        console.log(job.applied);
                        job.save();
                    }
                }
            })
            setTimeout(second, 2000);
            function second()
            {
                job.show = true;
                if ((job.remaining_positions==0) || (job.max_no_applications==job.no_applications))
                    job.full = true;
                if((job.salary>req.body.salary_y) || (job.salary<req.body.salary_x) || (job.duration>=req.body.duration))
                    job.show = false;

                console.log(job);
                job.recruiter.password = undefined;
            }
        })
        setTimeout(function third(){
            console.log(jobs);
            res.json(jobs);
        },3000);
        })
    .catch(err => {res.status(400).send("No Job Found");});
    })

// Tokens

router.route('/tokens').get((req, res) => {
    Token.find()
      .then(tokens => res.json(tokens))
      .catch(err => res.status(400).json(err));
});

// Applications

router.post('/applications/apply', (req, res) => {

    Job.findOne({_id: req.body.job, isDeleted:false}, function(err, job) {
        if (!job)
            res.status(404).send("job is not found");
        else
        {
            User.findById(req.body.applicant, function(err, user){
            if (!user)
                res.status(404).send("user is not found");
            else
            {
                if(user.open_applications>=10)
                    return res.status(401).send('User has already applied to 10 jobs which are still open');
                if(user.if_got_a_job==1)
                    return res.status(401).send('You already have a job');
                
                Application.findOne({ job: req.body.job, applicant: req.body.applicant}, function(err, application){
                    if(application){
                        console.log("Already applied");
                        return res.status(400).json({'message': 'Already applied'});
                    }
                    else
                    {
                        let new_application = new Application({job: req.body.job, applicant: req.body.applicant });
                        new_application.status = "Applied";
                        new_application.date_of_application = new Date();
                        new_application.job = req.body.job;
                        new_application.applicant= req.body.applicant;
                        new_application.sop = req.body.sop;
                        
                        console.log(job.no_applications);
                        
                        job.no_applications += 1;
                        job.save();
                        console.log(user.open_applications);
                        
                        user.open_applications += 1;
                        user.save();

                        console.log(user.open_applications);

                        console.log(job.no_applications, job.positions);
                        new_application.save().then(new_application => {
                            res.json(new_application);
                        })
                        .catch(err => {
                            res.status(400).send("Update not possible");
                        });
                    }
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
            }
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        })
    }
    });
});

router.get('/applications/view', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) 
            return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                    return res.status(400).json({'message': 'User not found'});
                if(user.type != "J") 
                    return res.status(401).json({'message': 'Recruiter type'});
                

                Application.find({applicant: user})
                .populate({
                    path: 'job',
                    populate: {
                        path: 'recruiter'
                    }
                })
                .exec((err, applications) => {
                    if(err) 
                    {
                        console.log("error");
                        res.status(400).send(err);
                    }
                    else 
                    {
                        applications.forEach(application => {
                            application.job.recruiter.password = undefined;
                        })
                        res.status(200).json(applications);
                    }
                })
            })
            .catch(err => {
                console.log("Error! ");
                res.status(400).send(err);
            });
     })
    .catch(err => {res.status(400).send(err);});    
});

router.get('/applications/recruiter_view/:id', (req, res) => {

    Job.findOne({_id: req.params.id, isDeleted:false}, function(err, job2) {
        if (!job2)
            res.status(404).send("job is not found");
        else{
            // Application.find({job: req.params.id}, {$or:[{status: "Applied"}, {status:"Shortlisted"}]})//, function(err, applications){
            Application.find({$and: [{job: req.params.id}, {status: { $in: ["Applied", "Shortlisted"]}}]})//, function(err, applications){
                // User.find({$or:[{region: "NA"},{sector:"Some Sector"}]},
                // mongoose.find({title: {$in: ['some title', 'some other title']}})
                // .populate('job')
                .populate('applicant')
                .then(applications => {
                    res.status(200).json(applications);
                })
                .catch(err => res.status(400).send("No one applied"));
            }
        });
});


// router.route('jobs/edit/:id').post(function(req, res) {
router.post('/jobs/edit/:id', (req, res) => {
    Job.findById(req.params.id, function(err, job) {
        if (!job)
            res.status(404).send("data is not found");
        else
        {
            let addition_remaining_job = parseInt(req.body.positions) - job.positions;
            job.remaining_positions += parseInt(addition_remaining_job); // may get reduced as well
            job.positions = parseInt(req.body.positions);
            job.deadline_for_application = req.body.deadline_for_application; 
            job.max_no_applications = parseInt(req.body.max_no_applications); 
            console.log(job);
            job.save().then(job => {
                res.json('Job updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

router.route('/my_applications').get((req, res) => {

    Application.find()
    .populate({
        path: 'job',
        populate: {
            path: 'recruiter'
        }
    })
    .exec((err, applications) => {
        if(err) res.status(400).json(err);
        else 
        {
            applications.forEach(application => {
                application.job.recruiter.password = undefined;
            })
            res.status(200).json(applications);
        }
    })
});

router.get('/accepted_employees/:id', (req, res) => {

    console.log(req.params.id);
    User.find({if_job_recruiter: req.params.id, if_got_a_job: 1})
        .populate('if_job_recruiter')
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        })
    });

// router.get('/accepted_employees/:id', (req, res) => {

//     console.log(req.params.id);
//     Job.find({recruiter: req.params.id}, function(err, jobs){
//         // .then(jobs => {
//         if(err)
//             return res.status(400).send("No job found");
        
//             jobs.forEach(job2 => {
//                 console.log(job2);
//                 Application.find({job : job2._id, status:"Accepted"})
//                 .populate('job')
//                 .populate('applicant')
//                 .exec((err, applications) => {
//                     if(err) 
//                     {
//                         console.log("error");
//                         res.status(400).send(err);
//                     }
//                     else 
//                     {
//                         res.json(applications);
//                     }
//                 })
//                 // .then(applications => {
//                 //     // if(!applications)
//                 //         // return res.status(400).send("no applications");
//                 //     // applications.forEach(application => {
//                 //     //     // let x = application.applicant;
//                 //     //     // User.findById(x)
//                 //     //     // .then
//                 //     //     console.log(application.applicant);
//                 //     //     console.log(application.job);
//                 //     //     console.log(application.job.date_of_joining);
//                 //     //     console.log(application.job.title);
//                 //     // })
//                 //     // console.log(applications);
//                 //     res.status(201).send(applications);               
//                 // })
                
//                 })
//         })
//         // .catch(err => res.status().send(err));
// });

// router.post('/employee_rating', (req, res) => {

//     console.log(req.body);
//     let x = req.body.rate;
//     console.log(x);
//     Application.findById(req.body._id)//, function(err, application){
//     .populate('applicant')
//     .then(application => {
//         let user_id = application.applicant._id;
//             User.findById(user_id, function(err,user){
//                 if(!user)
//                     res.status(404).send("user is not found");
//                 else
//                 {
//                     user.rating = x;
//                     user.save();
//                 }
//             })
//     })
//     .catch(err => res.status(404).send("application is not found"));
// });

router.post('/employee_rating', (req, res) => {

    console.log(req.body);
    let x = req.body.rate;
    console.log(x);
    User.findById(req.body._id, function(err,user){
        if(!user)
            res.status(404).send("user is not found");
        else
        {
            user.rating = x;
            user.save().then(user => {
                res.json('User updated!');
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("Rating not possible");
            });
        }
    })
});

router.post('/job_rating', (req, res) => {

    console.log(req.body);
    let x = req.body.rate;
    console.log(x);
    Application.findById(req.body._id)//, function(err, application){
    .populate('job')
    .then(application => {
        let job_id = application.job._id;
            Job.findById(job_id, function(err,job){
                if(!job)
                    res.status(404).send("job is not found");
                else
                {
                    job.sum_of_rating += parseInt(x);
                    job.no_of_rating += 1;
                    job.rating = job.sum_of_rating/(job.no_of_rating); 
                    console.log(job.rating);
                    job.save().then(job => {
                        res.json('Job updated!');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send("Rating not possible");
                    });
                }
            })
    })
    .catch(err => res.status(404).send("application is not found"));
});

router.get('/sop/:id', (req, res) => {

    console.log(req.body);
    Application.findById(req.params.id)
    .then(application => {
        application.sop = req.body.sop;
        application.save().then(job => {
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("SOP length mismatch");
        });;
    })
    .catch(err => res.status(404).send("application is not found"));
});

module.exports = router;

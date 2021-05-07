# Job Portal

Number of applicants = number of pending applications( not shortlisted nor rejected)
if an applicant is shortlisted or rejected by recruiter, other applicants can apply for same job.

### To Run
```
sudo systemctl start mongod
``` 

Run Express:
``` 
cd backend/
npm install
npm start
```

Run GridFS:
``` 
cd backend2/
npm install
npm start
```

Run react:
```
cd frontend/
npm install
npm start
```

> Navigate to localhost:3000/ in your browser

### About
Frontend and backend have been divided in their respective folders

#### Backend
- In backend, models has all the schemas
- `api.js` has all the APIs

#### Frontend
- Bootstrap has been used for the UI
- All components are declared in the `src/components` folder
- They are all routed in `App.js`
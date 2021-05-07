const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
// const config = require('./config');

const app = express();
const PORT = 4000;
// const userRoutes = express.Router();
// const router = express();

const api = require('./api');
let User = require('./models/user');
let Token = require('./models/token');
let Application = require('./models/application');
let Job = require('./models/job');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);
// Connection to mongodb

const eraseDatabaseOnSync = false;

// mongoose.connect(config.db);
mongoose.connect('mongodb://127.0.0.1:27017/job_portal', { useNewUrlParser: true })
.then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            User.deleteMany({}), User.remove({}),
            Token.deleteMany({}),
            Application.deleteMany({}),
            Job.deleteMany({}),
        ]);
    }
    app.listen(PORT, () =>
        console.log(`Example app listening on port ${PORT}!`),
    );
});;

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// const port = process.env.PORT || 3001;
// var server = app.listen(port);

// module.exports = server;
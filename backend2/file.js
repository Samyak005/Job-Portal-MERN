const router = require('express').Router();
const multer  = require('multer');
// var mongo = require('mongodb');
// var Grid = require('gridfs-stream');

// const db = mongo.MongoClient
//   .connect('mongodb://127.0.0.1:27017')
//   .then(client => client.db('my_files'));

// create or use an existing mongodb-native db instance
// var db = new mongo.Db('my_files', new mongo.Server("127.0.0.1", 27017));
// db = connect("localhost:27017/job_portal")
// var gfs = Grid(db, mongo);


// // var mongo = require('mongodb');
// var mongoose = require('mongoose');
// const uri = 'mongodb://localhost:27017/job_portal';
// const conn = mongoose.createConnection(uri);
// var db = conn.db;
// // var db = connect("localhost:27017/job_portal");
const { mongo, connection } = require('mongoose');

const Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
Grid.mongo = mongo;
var gfs = Grid(connection.db);
// var gfs = Grid(db);

// set up connection to db for file storage
const storage = require('multer-gridfs-storage')({
   db: connection.db,
   file: (req, file) => {
      return {
         filename: file.originalname
      }
   }
});
// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');


router.get('/files/:filename', (req, res) => {
   gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if(!files || files.length === 0){
         return res.status(404).json({
            message: "Could not find file"
         });
      }

      var readstream = gfs.createReadStream({
         filename: files[0].filename
      })
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
   });
});

router.get('/files3', (req, res) => {
   gfs.files.find().toArray((err, files) => {
      if(!files || files.length === 0){
         return res.status(404).json({
            message: "Could not find files"
         });
      }
      return res.json(files);
   });
});

// takes id and returns file for frontend
router.post('/files2', (req, res) => {
   console.log(req.body);
   console.log(req.body.id);

   gfs.findOne({ _id: req.body.id}, function(err, file){
      if(!file || file.length === 0){
         return res.status(404).json({
            message: "Could not find files"
         });
      }
      console.log(file);
      return res.send(file);
   });
});

// router.post('/files/:id', singleUpload, (req, res) => {
//    if (req.file) {
//       // req.file.filename = req.params.id;
//       return res.json({
//          success: true,
//          file: req.file
//       });
//    }
//     res.send({ success: false });
// });

router.post('/files', singleUpload, (req, res) => {
   if (req.file) {
      if(req.file.contentType.localeCompare('application/pdf')==0){
      return res.json({
         success: true,
         file: req.file
      });
   }
}
    res.send({ success: false });
});

router.post('/files4', singleUpload, (req, res) => {
   if (req.file) {
      console.log(req.file);
      if((req.file.contentType.localeCompare('image/jpeg')==0) || (req.file.contentType.localeCompare('image/png')==0))
      {
      return res.json({
         success: true,
         file: req.file
      });
   }
}
    res.send({ success: false });
});

router.delete('/files/:id', (req, res) => {
   gfs.remove({ _id: req.params.id }, (err) => {
      if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
   })
})

module.exports = router;

var express = require('express');
var router = express.Router();


var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var multer = require('multer')

// for random uuid name
// var upload = multer({ dest: './uploads/' });

// using file original name
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});
 
var upload = multer({ storage: storage });

//middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date.now());
    next();
});

//Home page
router.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "home.htm");
})

//processing GET request
router.get('/process_get', function (req, res) {

    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        message: 'Result from a GET request'
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

//processing POST Request
//router.post('/process_post', urlencodedParser, function (req, res) {
router.post('/process_post', upload.array(), function (req, res) {

    // Prepare output in JSON format
    // response = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     message: 'Result from a POST request'
    // };
    // console.log(response);
    // res.end(JSON.stringify(response));
    console.log(req.body);
    res.end(JSON.stringify(req.body));
})

//Multipart request (Accept one file where the name of the form field is named photo)
router.post('/file_upload', upload.single('photo'), function (req, res) {

    console.log(req.body) // form fields

    //console.log(req.body.first_name)
    //console.log(req.body.last_name)

    console.log(req.file) // form files
    res.status(204).end()
});

module.exports = router;


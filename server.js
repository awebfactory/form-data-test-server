var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

app.use(express.static('public'));

//Routes
app.use(require('./routes'));

//app.use("/user",require('./routes'));  //http://127.0.0.1:8000/user  http://127.0.0.1:8000/user/about


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server started.. (listening at http://%s:%s)", host, port)

})


var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors')
var server = require('http').createServer(app);

var CharacterController = require('./controllers/CharacterController')

var port = server.listen(3000);

require ('./db/db.js');

app.use(cors())



app.use('/characters', CharacterController);





//Angular should handle all this code
// app.use(express.static(path.join(__dirname, 'public')));


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');


server.listen(3000, function () {

	console.log("listening on port " + port);
})


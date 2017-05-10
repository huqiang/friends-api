let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let friend = require('./routes/friend');

app.use('/api/apidoc/', express.static('apidoc'));

app.use(morgan('combined'));
app.use(bodyParser.json());

//Root
app.get('/', (req, res) => res.json({message: 'Welcome to our Friends Management System!'}));

//API info
app.get('/api', (req, res) => res.json({'api-version': '1.0'}));

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;
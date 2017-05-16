let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let friend = require('./routes/friend');

app.use('/api/apidoc/', express.static('apidoc'));

app.use(morgan('combined'));
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

//Root
app.get('/', (req, res) => res.json({message: 'Welcome to our Friends Management System!'}));

//API info
app.get('/api', (req, res) => res.json({'api-version': '1.0.0'}));

//All api requests use POST request.
app.post('/api/createFriendship', friend.createFriendship);
app.post('/api/getFriends', friend.getFriends);
app.post('/api/getCommonFriends', friend.getCommonFriends);
app.post('/api/subscribeUpdates', friend.subscribeUpdates);
app.post('/api/blockUpdates', friend.blockUpdates);
app.post('/api/getRecipients', friend.getRecipients);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;
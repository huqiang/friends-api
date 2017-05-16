let Friend = require("../models/friend");

/**
 * @api {post}  /createFriendship Create new friendship
 * @apiName Create friends connection
 * @apiGroup Friends
 * @apiHeader {String} Content-Type=application/json
 * @apiHeaderExample {json} Content-Type:
 *     {
 *       "Content-Type": "application/json"
 *     }
 * @apiParam {String[]} friends two friends emails
 * @apiParamExample {json} Request-Example:
 *     {
 *       "friends":
 *        [
 *          "andy@example.com",
 *          "john@example.com"
 *        ]
 *     }
 * 
 * @apiSuccess (201) {Boolean} Success success status(true)
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "success": true
 *    }
 *
 *
 * @apiError (400) {Boolean} Success success status(false)
 * @apiError (400) {String} Message failure message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "success": false,
 *      "message": "The request cannot be proceed,...."
 *    }
 */
function createFriendship(req, res){
  let friends = req.body.friends;

  if ( friends.length != 2){
    res.status(400);
    res.send(_getErrorResponse("Wrong number of friends: "+friends.length));
  }

  let foundA = Friend.findByEmail(friends[0]);
  let foundB = Friend.findByEmail(friends[1]);
  if ( foundA === null){
    foundA = Friend.create(friends[0]); 
  }
  if ( foundB === null){
    foundB = Friend.create(friends[1]);
  }
  
  let errorMsg = "";
  if (Friend.isBlockingEmail(foundA, foundB.email)){
    errorMsg = foundA.email + " blocks " + foundB.email;
  }
  if ( Friend.isBlockingEmail(foundB, foundA.email)){
    errorMsg += "\n" + foundB.email + " blocks " + foundA.email;
  }
  if (errorMsg !== "" ){
    res.status(400);
    res.send(_getErrorResponse(""));
  }

  //No block friendship can be setup
  foundA.friends.add(foundB.email);
  foundB.friends.add(foundA.email);

  res.status(201);
  res.send(_getSuccessResponse());
}

/**
 * @api {post}  /getFriends Get friends list of given email
 * 
 * @apiName Get friends list
 * @apiGroup Friends
 * @apiParam {String} email querying email
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "andy@example.com"
 *     }
 * 
 * @apiSuccess (200) {Boolean} success success status(true)
 * @apiSuccess (200) {String[]} friends list of friend emails
 * @apiSuccess (200) {Number} count number of friends
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "friends":
 *        [
 *          "john@example.com"
 *        ],
 *      "count": 1
 *    }
 *
 *
 * @apiError (404) {Boolean} Success success status(false)
 * @apiError (404) {String} Message failure message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "success": false,
 *      "message": "Cannot find andy@example.com"
 *    }
 */
function getFriends(req, res){
  let email = req.body.email;
  let found = Friend.findByEmail(email);
  if ( found === null){
    res.status(404);
    res.send(_getErrorResponse(email + " Not Found"));
    return;
  }

  res.status(200);
  let success = _getSuccessResponse();
  success.friends = [...found.friends];
  success.count = found.friends.size;
  res.send(success);
}

/**
 * @api {post}  /getCommonFriends Get common friends list of given two emails
 * 
 * @apiName Get common friends list
 * @apiGroup Friends
 * @apiParam {String[]} friends two friends emails
 * @apiParamExample {json} Request-Example:
 *     {
 *       "friends":
 *        [
 *          "andy@example.com",
 *          "john@example.com"
 *        ]
 *     }
 * 
 * @apiSuccess (200) {Boolean} success success status(true)
 * @apiSuccess (200) {String[]} friends list of friend emails
 * @apiSuccess (200) {Number} count number of friends
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "friends":
 *        [
 *          "common@example.com"
 *        ],
 *      "count": 1
 *    }
 *
 *
 * @apiError (404) {Boolean} Success success status(false)
 * @apiError (404) {String} Message failure message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "success": false,
 *      "message": "Cannot find andy@example.com"
 *    }
 */
function getCommonFriends(req, res){
  let friends = req.body.friends;

  if ( friends.length != 2){
    res.status(400);
    res.send(_getErrorResponse("Wrong number of friends: "+friends.length));
  }

  let foundA = Friend.findByEmail(friends[0]);
  let foundB = Friend.findByEmail(friends[1]);
  if ( foundA === null){
    foundA = Friend.create(friends[0]); 
  }
  if ( foundB === null){
    foundB = Friend.create(friends[1]);
  }
  
  res.status(200);
  let success = _getSuccessResponse();
  success.friends = [...foundA.friends].filter(x => foundB.friends.has(x));
  success.count=success.friends.size;
  res.send(success);
}


/**
 * @api {post}  /subscribeUpdates Subscribe for updates
 * 
 * @apiName Create updates subscription
 * @apiGroup Friends
 * @apiParam {String} requestor requestor email
 * @apiParam {String} target target email
 * @apiParamExample {json} Request-Example:
 *     {
 *       "requestor": "lisa@example.com",
 *       "target":"john@example.com"
 *     }
 * 
 * @apiSuccess (200) {Boolean} Success success status(true)
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true
 *    }
 *
 *
 * @apiError (400) {Boolean} Success success status(false)
 * @apiError (400) {String} Message failure message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "success": false,
 *      "message": "The request cannot be proceed,...."
 *    }
 */
function subscribeUpdates(req, res){
  let requestorEmail = req.body.requestor,
      targetEmail = req.body.target;


  let requestor = Friend.findByEmail(requestorEmail),
      target = Friend.findByEmail(targetEmail);

  if ( requestor === null ){
    // res.status(400);
    // res.send(_getErrorResponse(requestorEmail+ " not found"));
    // change to create a Friend
    requestor = Friend.create(requestorEmail);
  }

  if ( target === null ){
    // res.status(400);
    // res.send(_getErrorResponse(targetEmail+ " not found"));
    target = Friend.create(targetEmail);
  }

  requestor.subscribes.add(targetEmail);
  res.status(200);
  res.send(_getSuccessResponse());

}

/**
 * @api {post}  /blockUpdates block for updates
 * 
 * @apiName Create updates blocking
 * @apiGroup Friends
 * @apiParam {String} requestor requestor email
 * @apiParam {String} target target email
 * @apiParamExample {json} Request-Example:
 *     {
 *       "requestor": "andy@example.com",
 *       "target":"john@example.com"
 *     }
 * 
 * @apiSuccess (201) {Boolean} Success success status(true)
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Ok
 *    {
 *      "success": true
 *    }
 *
 *
 * @apiError (400) {Boolean} Success success status(false)
 * @apiError (400) {String} Message failure message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "success": false,
 *      "message": "The request cannot be proceed,...."
 *    }
 */
function blockUpdates(req, res){
  let requestorEmail = req.body.requestor,
      targetEmail = req.body.target;


  let requestor = Friend.findByEmail(requestorEmail),
      target = Friend.findByEmail(targetEmail);

  if ( requestor === null ){
    requestor = Friend.create(requestorEmail);
  }

  if ( target === null ){
    target = Friend.create(targetEmail);
  }

  requestor.blocks.add(targetEmail);
  res.status(200);
  res.send(_getSuccessResponse());
}


/**
 * @api {post}  /getRecipients Get recipients list of given sender and text
 * 
 * @apiName Get recipients list
 * @apiGroup Friends
 * @apiParam {String} sender sender email
 * @apiParam {String} text text contents
 * @apiParamExample {json} Request-Example:
 *     {
 *       "sender": "john@example.com",
 *       "text": "Hello World! kate@example.com"
 *     }
 * 
 * @apiSuccess (200) {Boolean} success success status(true)
 * @apiSuccess (200) {String[]} recipients list
 * @apiSuccessExample {json} Error-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "recipients":
 *        [
 *          "lisa@example.com",
 *          "kate@example.com",
 *          "common@example.com"
 *        ]
 *    }
 *
 *
 * @apiError (404) {Boolean} Success success status(false)
 * @apiError (404) {String} Message failure message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "success": false,
 *      "message": "Cannot find andy@example.com"
 *    }
 */
function getRecipients(req, res){
  let senderEmail = req.body.sender,
      text = req.body.text;

  let sender = Friend.findByEmail(senderEmail),
      recipients = new Set(sender.friends);

  /** Parsing text to extract email address, simply take
   *  string that contains @
   */
  for (let token of text.split(" ")){
    if (token.includes("@")){
      recipients.add(token);
    }
  }
  for (let f of Friend.friends ){
    console.log(f);
    console.log(text.includes(f.email));
    if ( text.includes(f.email) || f.subscribes.has(senderEmail)){
      recipients.add(f.email);
    }
    console.log(recipients);
    if ( f.blocks.has(senderEmail) ){
      recipients.delete(f.email);
    }
    console.log(recipients);
  }

  let success = _getSuccessResponse();
  success.recipients = [...recipients];
  res.status(200);
  res.send(success);

}


function _getErrorResponse(msg){
  let error = _getResponse(false);
  error.message = msg;
  return error;
}

function _getSuccessResponse(){
  return _getResponse(true);
}

function _getResponse(success){
  return {"success":success};
}


//export all the functions
module.exports = {createFriendship
,getFriends
,getCommonFriends
,subscribeUpdates
,blockUpdates
,getRecipients};


/**
 * @api {post}  /createFriendship Create new friendship
 * 
 * @apiName Create friends connection
 * @apiGroup Friends
 * @apiParam {String[]} friends two friends emails
 * @apiParamExample {json} Request-Example:
 *     {
 *       friends:
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



}

/**
 * @api {post}  /getFriends Get friends list of given email
 * 
 * @apiName Get friends list
 * @apiGroup Friends
 * @apiParam {String} email querying email
 * @apiParamExample {json} Request-Example:
 *     {
 *       email: "andy@example.com"
 *     }
 * 
 * @apiSuccess (200) {Boolean} success success status(true)
 * @apiSuccess (200) {String[]} friends list of friend emails
 * @apiSuccess (200) {Number} count number of friends
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
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

}

/**
 * @api {post}  /getCommonFriends Get common friends list of given two emails
 * 
 * @apiName Get common friends list
 * @apiGroup Friends
 * @apiParam {String[]} friends two friends emails
 * @apiParamExample {json} Request-Example:
 *     {
 *       friends:
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
 *    HTTP/1.1 201 Created
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
function subscribeUpdates(req, res){

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
function blockUpdates(req, res){

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
 *          "kate@example.com"
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

}
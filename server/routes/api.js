// Designed by: Ankit Gyawali
// Email: agyaw792@gmail.com
// Description: Contains API services for syllabus manager app.
// Helps with different CRUD operation on the database collection.
var express = require('express'),
    router = express.Router(),
    expressSession = require('express-session');
var models = require('../database.js');


//Destroys session variables held on the server side during the app cycle.
router.get('/logout', function(req, res) {
    req.session.destroy();
});





//Export routes
module.exports = router;
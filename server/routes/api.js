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


//Destroys session variables held on the server side during the app cycle.
router.post('/save', function(req, res) {

console.log(req.body);

 models.worldCol.collection.insert(req.body, onInsert);

    function onInsert(err, docs) {
        if (err) {
        	console.log(err);
            return res.sendStatus(500);
        } else {
        	console.log(docs.insertedIds[0]);
            return res.json(docs.insertedIds[0]);
        }
    }



});


//Destroys session variables held on the server side during the app cycle.
router.post('/view', function(req, res) {

  models.worldCol.findOne({
            _id: req.body.worldID
        }, 
        function(err, doc) {
            if (err) {
                return res.sendStatus(500);
            }
            res.send(doc);
        });




});




//Export routes
module.exports = router;
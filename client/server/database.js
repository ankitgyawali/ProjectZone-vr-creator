//Mongoose connection 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vrcreator');

var db = mongoose.connection;


//Checksheet Schema
var worldSchema = mongoose.Schema({
    worldJSON: Object
}, {
    collection: 'world'
});
var worldCol = mongoose.model('world', worldSchema);



//Export schema variables
module.exports = {
    world: worldCol,
};
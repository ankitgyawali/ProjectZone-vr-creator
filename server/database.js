//Mongoose connection 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vrcreator');

var db = mongoose.connection;


//Checksheet Schema
var worldSchema = mongoose.Schema({
    roomobject: Array,
    roomColor:String,
    wall1:String,
    wall2:String,
    wall3:String,
    wall4:String,
    ceiling:String,
    floor:String,
    roomSize:String,
    animateOrNot:String,
    emptyRoom:Boolean,
    enforceGravity: String
}, {
    collection: 'world'
});
var worldCol = mongoose.model('world', worldSchema);


//Export schema variables
module.exports = {
    worldCol: worldCol,
};
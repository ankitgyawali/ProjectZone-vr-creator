//Mongoose connection 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ksm');

var db = mongoose.connection;

//Export schema variables
// module.exports = {
//     root: rootCol,
//     advisor: advisorCol,
//     student: studentCol,
//     department: departmentCol,
//     class: classCol,
//     block: blockCol,
//     checksheet: checksheetCol
// };
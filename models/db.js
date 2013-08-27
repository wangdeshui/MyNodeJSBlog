var db = require('mongoose');
db.connect('mongodb://localhost/blog');

module.exports=db;
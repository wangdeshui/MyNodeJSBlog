/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 8/27/13
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('./db.js');

var PostSchema = mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    comments: [
        {
            name: String,
            subject: String,
            comment: String,
            createdAt: Date
        }
    ],
    createdAt: Date,
    updatedAt: Date

});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;


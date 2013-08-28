var Post = require('../models/Post.js');
var User = require('../models/User.js');
var markdown = require('markdown').markdown;


exports.articlepage = function (req, res) {
    res.render('post', new Post());
};


exports.postarticle = function (req, res) {
    var post = new Post({title: req.body.title, summary: req.body.summary, content: req.body.content, createdAt: new Date()});
    post.content = markdown.toHTML(post.content);
    post.save(function (err, post) {
        res.redirect("/");
    });
};


exports.viewarticle = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        res.render('article', post);
    });
};


exports.editarticle = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        res.render('post', post);
    });
};

exports.editarticleSave = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        post.title = req.body.title;
        post.summary = req.body.summary;
        post.content = req.body.content;
        post.save(function (err, post) {
            res.redirect("/managepost");
        });

    });
};

exports.deletearticle = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        post.remove(function (err) {
            res.redirect("/managepost");
        });

    });
};

exports.postcomment = function (req, res) {
    Post.findById(req.body.id, function (err, post) {
        var comment = {name: req.body.name, subject: req.body.subject, comment: req.body.comment};
        post.comments.push(comment);
        post.save(function (err, post) {
            res.render("shared/comment", {layout: "", comment: comment});
        });
    });
};
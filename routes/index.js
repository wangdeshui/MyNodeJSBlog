var User = require('../models/User.js');
var Post = require('../models/Post.js');
var markdown = require('markdown').markdown;
module.exports = function (app) {
    app.get('/', function (req, res) {
        Post.find({},function(err,posts){
            res.render('index', { posts: posts, user: req.session.user});

        });
    });

    app.get('/admin', function (req, res) {
        var isFirstSetting = false;
        User.findOne({name: 'admin'}, function (err, user) {
            if (user == null) {
                isFirstSetting = true;
            }
            res.render('admin', {isFirstSetting: isFirstSetting, error: '', user: req.session.user});
        });
    });

    app.post('/admin', function (req, res) {
        User.findOne({name: 'admin'}, function (err, user) {
            if (user != null) {

                if (req.body.OldPassword != user.password) {
                    res.render('admin', {isFirstSetting: false, error: 'old password is wrong', user: req.session.user});
                    return;
                }
            }
            user.password = req.body.NewPassword;
            user.save(function (err, user) {
                res.redirect("/");
            });
        });
    });

    app.get('/login', function (req, res) {
        res.render('login', { title: '登录', error: req.flash('loginError').toString(), user: req.session.user });
    });
    app.post('/login', function (req, res) {

        User.findOne({name: req.body.UserName}, function (err, user) {
            {
                if (user != null && user.password == req.body.password) {
                    req.session.user = user;
                    res.redirect("/");
                }
                else {
                    req.flash('loginError', "the password is wrong")
                    res.redirect("/login");
                }
            }
        });
    });
    app.get('/post',  function (req, res) {
        res.render('post', { title: '发表' ,user: req.session.user});
    });
    app.post('/post', function (req, res) {
        var post=new Post({title:req.body.title,summary:req.body.summary,content:req.body.content});
        post.content=markdown.toHTML(post.content);
        post.save(function(err,post){
            res.redirect("/");
        });

    });

    app.get('/post/:id',function(req,res){
         Post.findById(req.params.id,function(err,post){
                res.render('article',post);
         });
    });

    app.get('/logout', function (req, res) {
        req.session.user = null;
        res.redirect("/");
    });


};


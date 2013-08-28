var Post = require('../models/Post.js');
var User = require('../models/User.js');

exports.homepage = function (req, res) {
    Post.find({}).sort("-createdAt").exec(
        function (err, posts) {
            res.render('index', { posts: posts});
        });
};


exports.adminpage = function (req, res) {
    var isFirstSetting = false;
    User.findOne({name: 'admin'}, function (err, user) {
        if (user == null) {
            isFirstSetting = true;
        }
        res.render('admin', {isFirstSetting: isFirstSetting, error: ''});
    });
};


exports.postadmin = function (req, res) {
    User.findOne({name: 'admin'}, function (err, user) {
        if (user != null) {

            if (req.body.OldPassword != user.password) {
                res.render('admin', {isFirstSetting: false, error: 'old password is wrong'});
                return;
            }
        }
        user.password = req.body.NewPassword;
        user.save(function (err, user) {
            res.redirect("/");
        });
    });
};


exports.login = function (req, res) {
    res.render('login', { title: '登录', error: req.flash('loginError').toString()});
};

exports.postlogin = function (req, res) {

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
    })
};

exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect("/");
};

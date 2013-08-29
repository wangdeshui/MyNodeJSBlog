var account = require('./account.js');
var article = require('./article.js');

module.exports = function (app) {

    app.get('/', account.homepage);

    app.get('/admin', account.adminpage);
    app.post('/admin', account.postadmin);

    app.get('/login', account.login);
    app.post('/login', account.postlogin);
    app.post('/comments', article.postcomment);
    app.get('/post/:id', article.viewarticle);


    // below need permission
    app.get('/post',account.checkLogin, article.articlepage);
    app.post('/post', account.checkLogin,article.postarticle);

    app.get('/logout', account.checkLogin, account.logout);

    app.get('/managepost',account.checkLogin,account.managepost);

    app.get('/post/edit/:id',account.checkLogin,article.editarticle);
    app.post('/post/edit/:id',account.checkLogin,article.editarticleSave);

    app.get('/post/delete/:id',account.checkLogin,article.deletearticle);


};


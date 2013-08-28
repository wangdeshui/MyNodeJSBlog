var account = require('./account.js');
var article = require('./article.js');

module.exports = function (app) {

    app.get('/', account.homepage);

    app.get('/admin', account.adminpage);
    app.post('/admin', account.postadmin);

    app.get('/login', account.login);
    app.post('/login', account.postlogin);


    app.get('/post', article.articlepage);
    app.post('/post', article.postarticle);
    app.get('/post/:id', article.viewarticle);


    app.post('/comments', article.postcomment);
    app.get('/logout', account.logout);

    app.get('/managepost',account.managepost);

    app.get('/post/edit/:id',article.editarticle);
    app.post('/post/edit/:id',article.editarticleSave);

    app.get('/post/delete/:id',article.deletearticle);


};


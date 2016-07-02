'use strict';

var apicache = require('apicache').options({ debug: true }).middleware;


var Get = require('./get');
var Post = require('./post');
var Put = require('./put');

module.exports = {
    init (app) {
        app.get('/clear-cache', Get.clearCache);
        app.get('/api/home', apicache('1 day'), Get.home);
        app.get('/api/post/:id', apicache('1 day'), Get.post);
        app.get('/api/author/:id', apicache('1 day'), Get.author);
        app.get('/api/authors/:page', apicache('1 day'), Get.authors);
        app.get('/api/post/slug/:slug', apicache('1 day'), Get.postBySlug);
        app.get('/api/posts/cat/:cat', apicache('1 day'), Get.postsByCat);
        app.get('/api/posts/tag/:tag', apicache('1 day'), Get.postsByTag);
        //app.get('/api/posts/author/:id', Get.postsByAuthor);
        app.get('/api/posts/:filter/:value', apicache('1 day'), Get.postsByFilter);
        app.get('/api/posts', apicache('1 day'), Get.posts);
        //app.get('/api/pages/name/:name', apicache('1 day'), Get.pagesByName);
        app.get('/api/pages/:filter/:value', apicache('1 day'), Get.pagesByFilter);
        app.get('/:year/:month/:day/:slug/', Get.postPage);
        app.get('*', Get.indexPage);
    }
};
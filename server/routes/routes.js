'use strict';

var Get = require('./get');
var Post = require('./post');
var Put = require('./put');

module.exports = {
    init (app) {
        app.get('/api/home', Get.home);
        app.get('/api/post/:id', Get.post);
        app.get('/api/posts/cat/:cat', Get.postsByCat);
        app.get('/api/posts/tag/:tag', Get.postsByTag);
        app.get('/api/posts', Get.posts);
        app.get('*', Get.index);
    }
};
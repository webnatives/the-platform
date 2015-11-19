'use strict';

var Get = require('./get');
var Post = require('./post');
var Put = require('./put');

module.exports = {
    init (app) {
        app.get('/api/', Get.collections);
        app.get('/api/:collection/:key/:value', Get.documentByKeyValue);
        app.get('/api/:collection/', Get.documents);
        app.get('*', Get.index);

        app.post('/api/:collection/', Post.document);

        app.put('/api/:collection/:key/:value', Put.document);
    }
};
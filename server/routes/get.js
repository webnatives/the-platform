'use strict';

var fs = require('fs');
var _ = require('underscore');
var MongoService = require('./../services/mongo-service');
var request = require('request');

var standardData = {
    title: "The Platform | Challenging opinions on current affairs and culture.",
    ogTitle: "A groundbreaking commentary blog that provides a platform for challenging opinions on current affairs and culture.",
    ogSiteName: "The Platform",
    ogUrl: "http://www.the-platform.org.uk",
    ogImage: "http://www.the-platform.org.uk/wp-content/themes/Nuke/images/logo_white.png",
    ogDescription: "A groundbreaking commentary blog that provides a platform for challenging opinions on current affairs and culture.",
    ogType: "website"
};

var API = "http://52.18.144.118";
//var API = "http://www.the-platform.org.uk";

module.exports = {
    collections(req, res) {
        MongoService.getCollections(docs => res.send(docs));
    },

    documentByKeyValue(req, res) {
        var query = {};
        query[req.params.key] = req.params.value;
        MongoService.findDocuments(req.params.collection, query, {}, docs => res.send(docs));
    },

    documents(req, res) {
        MongoService.findDocuments(req.params.collection, req.query, {}, docs => res.send(docs));
    },

    index(req, res) {
        //res.send('hello')
        res.render('index', standardData);
    },

    home(req, res) {
        request.get({url: `${API}/wp-json/pages/home`, json: true}, function (e, r, body) {
            //standardData.content = body;
            res.send(body);
        })
    },

    postsByAuthor: (req, res) => request.get({
        url: `${API}/wp-json/posts?filter[author]=${req.params.id}`,
        json: true
    }, (e, r, body) => res.send(body)),

    postsByFilter: (req, res) => request.get({
        url: `${API}/wp-json/posts?filter[${req.params.filter}]=${req.params.value}`,
        json: true
    }, (e, r, body) => res.send(body)),

    post: (req, res) => request.get({
        url: `${API}/wp-json/posts/${req.params.id}`,
        json: true
    }, (e, r, body) => res.send(body)),

    postBySlug(req, res) {
        request.get({
            url: `${API}/wp-json/posts?filter[name]=${req.params.slug}`,
            json: true
        }, function (e, r, body) {
            //standardData.content = body
            res.send(body[0]);
        })
    },


    posts(req, res) {
        request.get({url: `${API}/wp-json/posts/?filter[posts_per_page]=10`, json: true}, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    },

    postsByCat(req, res) {
        request.get({
            url: `${API}/wp-json/posts?filter[posts_per_page]=20&filter[category_name]=${req.params.cat}`,
            json: true
        }, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    },

    postsByTag(req, res) {
        request.get({
            url: `${API}/wp-json/posts?filter[posts_per_page]=20&filter[tag]=${req.params.tag}`,
            json: true
        }, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    }
};


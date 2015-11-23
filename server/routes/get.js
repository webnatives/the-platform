'use strict';

var fs = require('fs');
var _ = require('underscore');
var MongoService = require('./../services/mongo-service');
var request = require('request');

var standardData = {
    title: "Nathan-Jamahiel Nelson - Powerful Code and Efficient Living with Nathan Jamahiel Nelson",
    ogTitle: "Powerful Code and Efficient Living with Nathan-Jamahiel Nelson",
    ogSiteName: "Jamahiel",
    ogUrl: "http://www.jamahiel.com",
    ogImage: "http://www.jamahiel.com/public/img/hero-india.jpg",
    ogDescription: "A full-stack developer/designer with a passion for powerful, minimal code and efficient living.",
    ogType: "website"
};

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
        request.get({url: "http://52.18.144.118/wp-json/pages/home", json: true}, function (e, r, body) {
            //standardData.content = body;
            res.send(body);
        })
    },

    post(req, res) {
        request.get({url: `http://52.18.144.118/wp-json/posts/${req.params.id}`, json: true}, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    },

    posts(req, res) {
        request.get({url: `http://52.18.144.118/wp-json/posts/`, json: true}, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    },

    postsByCat(req, res) {
        request.get({url: `http://52.18.144.118/wp-json/posts?filter[category_name]=${req.params.cat}`, json: true}, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    }
};


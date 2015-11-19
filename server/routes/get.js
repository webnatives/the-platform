'use strict';

var fs = require('fs');
var _ = require('underscore');
var MongoService = require('./../services/mongo-service');

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
        res.render('index', standardData);
    }
};


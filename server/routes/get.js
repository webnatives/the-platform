'use strict';

var fs = require('fs');
var _ = require('underscore');
var request = require('request');
var rp = require('request-promise');


var standardData = {
    title: "The Platform | Challenging opinions on current affairs and culture.",
    ogTitle: "A groundbreaking commentary blog that provides a platform for challenging opinions on current affairs and culture.",
    ogSiteName: "The Platform",
    ogUrl: "http://platformonline.uk",
    ogImage: "http://platformonline.uk/wp-content/themes/Nuke/images/logo_white.png",
    ogDescription: "A groundbreaking commentary blog that provides a platform for challenging opinions on current affairs and culture.",
    ogType: "website"
};

var API = "http://admin.platformonline.uk/wp-json/wp/v2/";
//var API = "http://platform.jamahielhosting.com/wp-json/wp/v2/";
//var API = "http://www.the-platform.org.uk";

module.exports = {

    indexPage(req, res) {
        //res.send('hello')
        res.render('index', standardData);
    },

    postPage(req, res) {
        request.get({
            url: `${API}posts?filter[name]=${req.params.slug}&_embed`,
            json: true
        }, function (e, r, body) {
            console.log(`${API}posts?filter[name]=${req.params.slug}&_embed`, 'postPage', body[0]);

            var data = {
                title: body[0].title.rendered + " | The Platform",
                ogTitle: body[0].title.rendered + " | The Platform",
                ogSiteName: "The Platform",
                ogUrl: "http://platformonline.uk",
                ogImage: body[0]._embedded['wp:featuredmedia'][0].source_url,
                ogDescription: body[0].excerpt.rendered,
                ogType: "website"
            };

            res.render('index', data);
        })

    },

    home(req, res) {
        //console.log('called home');
        request.get({url: `${API}pages/?slug=home&_embed`, json: true}, (e, r, body) => {
                //console.log(e,r,body);
                //standardData.content = body;
                res.send(body[0]);
            });
    },

    postsByAuthor: (req, res) => request.get({
        url: `${API}posts?filter[author]=${req.params.id}&_embed`,
        json: true
    }, (e, r, body) => res.send(body)),

    postsByFilter: (req, res) => request.get({
        url: `${API}posts?filter[${req.params.filter}]=${req.params.value}&_embed`,
        json: true
    }, (e, r, body) => {
        console.log(`${API}posts?filter[${req.params.filter}]=${req.params.value}&_embed`);
        //console.log(e,r,body);
        res.send(body)
    }),

    post: (req, res) => request.get({
        url: `${API}posts/${req.params.id}?_embed`,
        json: true
    }, (e, r, body) => res.send(body)),

    postBySlug(req, res) {
        request.get({
            url: `${API}posts?filter[name]=${req.params.slug}&_embed`,
            json: true
        }, function (e, r, body) {
            //standardData.content = body
            res.send(body[0]);
        })
    },


    posts(req, res) {
        request.get({url: `${API}posts/?filter[posts_per_page]=10&_embed`, json: true}, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    },

    postsByCat(req, res) {
        request.get({
            url: `${API}posts?filter[posts_per_page]=20&filter[category_name]=${req.params.cat}&_embed`,
            json: true
        }, function (e, r, body) {
            console.log(`${API}posts?filter[posts_per_page]=20&filter[category_name]=${req.params.cat}&_embed`);
            //standardData.content = body
            res.send(body);
        })
    },

    postsByTag(req, res) {
        request.get({
            url: `${API}posts?filter[posts_per_page]=20&filter[tag]=${req.params.tag}&_embed`,
            json: true
        }, function (e, r, body) {
            //standardData.content = body
            res.send(body);
        })
    }
};


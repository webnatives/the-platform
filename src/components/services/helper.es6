'use strict';

app.service('Helper', function ($rootScope, $http, $sce) {

    let getDateString = (article) => {
        //console.log('getDateString', article)
        if (!article) return "/";

        return "/" + moment(article.date).format('YYYY')
        + "/" + moment(article.date).format('MM')
        + "/" + moment(article.date).format('DD')
        + "/" + article.slug + "/";
    };

    let getImage = (content) => content && content._embedded && content._embedded['wp:featuredmedia'] ? content._embedded['wp:featuredmedia'][0].source_url : undefined;

    let getWhen = (content) => content ? moment(content.date).fromNow() : "";

    let getTitle = (content) => content ? $sce.trustAsHtml(content.title.rendered) : undefined;

    let getSummary = (content) => content ? $sce.trustAsHtml(content.acf.summary) : undefined;

    let getExcerpt = (content) => content ? $sce.trustAsHtml(content.excerpt.rendered) : undefined;

    let getTags = (content) => content ? content._embedded['wp:term'][1] : undefined;

    let getCat = (content) => content ? $sce.trustAsHtml(content._embedded['wp:term'][0][0].name) : undefined;

    let expose = {
        getWhen,
        getDateString,
        getImage,
        getTitle,
        getExcerpt,
        getSummary,
        getTags,
        getCat
    };

    _.extend($rootScope, expose);
    _.extend(this, expose);
})
;
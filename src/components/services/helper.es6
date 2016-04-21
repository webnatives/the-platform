'use strict';

app.service('Helper', function ($rootScope, $http) {

    var getDateString = (article) => {
        //console.log('getDateString', article)
        if (!article) return "/";

        return "/" + moment(article.date).format('YYYY')
        + "/" + moment(article.date).format('MM')
        + "/" + moment(article.date).format('DD')
        + "/" + article.slug + "/";
    };

    _.extend(this, {
        getDateString
    });
})
;
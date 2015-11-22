'use strict';

app.directive('latestItem', (State, API) => {
    return {
        templateUrl: 'latest.html',
        scope: {
            heading:'='
        },
        link(scope, element, attrs) {

            var articles;

            var getArticles = () => _.take(articles, 5);

            var init = () => {
                API.getPosts().then((response) => {
                    articles = response;
                    console.log('post (article-preview)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.assign(scope, {
                getArticles: getArticles
            });
        }
    }
});

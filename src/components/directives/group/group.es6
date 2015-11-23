'use strict';

app.directive('groupItem', (State, API) => {
    return {
        templateUrl: 'group.html',
        scope: {
            heading:'=',
            amount:'='
        },
        link(scope, element, attrs) {

            var articles, amount = scope.amount || 6;

            var getArticles = () => _.take(articles, amount);

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

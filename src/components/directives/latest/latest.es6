'use strict';

app.directive('latestItem', (State, API, Helper) => {
    return {
        templateUrl: 'latest.html',
        scope: {
            heading:'&',
            amount:'&'
        },
        link(scope, element, attrs) {

            var articles, amount = scope.amount() || 3;

            var getArticles = () => _.take(articles, amount);

            var init = () => {
                API.getPosts().then((response) => {
                    articles = response;
                    console.log('latest (latest)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.assign(scope, {
                getArticles: getArticles,
                getDateString:Helper.getDateString
            });
        }
    }
});

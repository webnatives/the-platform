'use strict';

app.directive('groupItem', (State, API) => ({
    templateUrl: 'group.html',
    scope: {heading: '&', ids: '&', horizontal: "&"},
    link(scope, element, attrs) {

        var articles = [];

        var init = () => {
            _.each(scope.ids(), (id, index) => API.getPost(id).then((response) => {
                articles.push(response);
                element.find('.fi').addClass('active');
            }));
        };

        init();

        scope = _.assign(scope, {
            getArticles: () => articles,
            getArticle: (index) => articles[index]
        });
    }
}));

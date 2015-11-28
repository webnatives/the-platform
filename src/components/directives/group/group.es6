'use strict';

app.directive('groupItem', (State, API) => ({
    templateUrl: 'group.html',
    scope: {heading: '&', ids: '&', horizontal:"&"},
    link(scope, element, attrs) {

        var articles = [];

        var init = () => {
            _.each(scope.ids(), (id, index) => {
                console.warn('group', index, id);
                API.getPost(id).then((response) => {
                    articles.push(response);
                    console.log('post (group)', id, response);
                    element.find('.fi').addClass('active');
                })
            });
        };

        init();

        scope = _.assign(scope, {
            getArticles: () => articles,
            getArticle: (index) => articles[index]
        });
    }
}));

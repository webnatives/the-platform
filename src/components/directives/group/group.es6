app.directive('groupItem', (State, API, Helper) => ({
    templateUrl: 'group.html',
    scope: {heading: '&', ids: '&', horizontal: "&"},
    link(scope, element, attrs) {

        var articles = [];

        var init = () => {
            console.log('ids',scope.ids())
            _.each(scope.ids(), (id, index) => API.getPost(id).then((response) => {
                console.log('group',id)
                articles.push(response);
                element.find('.fi').addClass('active');
            }));
        };

        init();

        scope = _.assign(scope, {
            getArticles: () => articles,
            getArticle: (index) => articles[index],
            getDateString: Helper.getDateString
        });
    }
}));

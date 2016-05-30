app.directive('authorPreviewItem', () => ({
    templateUrl: 'author-preview.html',
    controllerAs: 'author',
    bindToController: true,
    scope: {
        authorId: '@'
    },
    controller($scope, $element, State, API) {
        console.log('authorId', this);

        var author, articles;

        var init = () => {
            API.getAuthor(this.authorId).then((response) => {
                author = response;

                console.log('author response', response);
            });

            API.getPostsByAuthor(this.authorId).then((response) => {
                articles = response;

                console.log('author articles', articles);
            });
        };

        init();

        _.extend(this, {
            getAuthor: () => author,
            getArticles: () => articles.map(article => article.id)
        });
    }
}));

app.directive('authorPreviewItem', () => ({
    templateUrl: 'author-preview.html',
    controllerAs: 'author',
    bindToController: true,
    scope: {
        author: '=',
        authorId: '@',
        small: '='
    },
    controller($scope, $element, State, API) {
        console.log('authorId', this);

        var author, articles;

        var init = () => {
            if (this.authorId) {
                API.getAuthor(this.authorId).then((response) => {
                    author = response;

                    console.log('author response', response);
                });
            } else {
                author = this.author;
            }

            if (!this.small) {
                API.getPostsByAuthor(this.authorId).then((response) => {
                    articles = _.sampleSize(response, 5);

                    console.log('author articles', articles);
                });
            }



        };

        init();

        _.extend(this, {
            getAuthor: () => author,
            getArticles: () => articles.map(article => article.id)
        });
    }
}));

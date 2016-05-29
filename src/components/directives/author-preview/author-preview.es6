app.directive('authorPreviewItem', () => ({
    templateUrl: 'author-preview.html',
    controllerAs: 'author',
    bindToController: true,
    scope: {
        authorId: '@'
    },
    controller($scope, $element, State, API) {
        console.log('authorId', this);

        var author;

        var init = () => {
            API.getAuthor(this.authorId).then((response) => {
                author = response;

                console.log('author response', response);
            });
        };

        init();

        _.extend(this, {
            getAuthor: () => author
        });
    }
}));

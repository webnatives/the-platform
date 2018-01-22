app.controller('AuthorScreen', ($element, $timeout, API, $scope, $stateParams, $state, Loading) => {

    var author, articles;

    var load = () => {
        API.getAuthor($stateParams.author_id).then(response => {
            //console.log('author details', response);
            author = response;
            Loading.setActive(false);
            $element.find('[screen]').addClass('active');

            document.title = `${author.name} | The Platform Online`;
        });

        API.getPostsByAuthor($stateParams.author_id).then(response => {
            articles = response;

            //console.log('author articles', articles);
        });
    };

    var getNextPage = (amount) => {

    }

    var init = () => {
        load();
    };

    init();

    _.extend($scope, {
        getAuthor: () => author,
        getArticles: () => articles,
        getArticleIds: () => articles.map(article => article.id)
    })
});




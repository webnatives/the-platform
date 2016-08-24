app.controller('SearchScreen', ($element, $timeout, API, $scope, $stateParams, $state, Loading) => {

    var content, query = $stateParams.query;

    var init = () => {
        if (!$stateParams.query) {
            content = false;
            Loading.setActive(false);
            $state.go('home');
            return;
        }

        document.title = `Search Results for: ${$stateParams.query} | The Platform`;
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');

        API.getPostsBySearch($stateParams.query).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            Loading.setActive(false);
        });

    };

    init();

    _.extend($scope, {
        getArticle: (index) => content[index],
        getContent: () => content,
        getQuery: () => query,
        getFeaturedArticles: () => content,
        getContentHalf: (index) => _.chunk(_.rest(content), content.length / 4)[index]
    })
});




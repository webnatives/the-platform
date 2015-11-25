app.controller('HomeScreen', ($element, $timeout, API, $scope) => {

    var content, tags;

    var init = () => {
        API.getHome().then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active')
        });
        API.getPostsByTag("labour").then((response) => tags = response);

    };

    init();

    _.extend($scope, {
        getTags: () => tags,
        getContent: () => content,
        getFeaturedArticles: () => content.acf.featuredArticles,
        getArticle: (index) => content.acf.featuredArticles[index].article
    });
});




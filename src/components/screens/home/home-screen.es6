app.controller('HomeScreen', ($element, $timeout, API, $scope) => {

    var content;

    var getContent = () => content;

    var getFeaturedArticles = () => content.acf.featuredArticles;

    var getArticle = (index) => content.acf.featuredArticles[index].article;

    var init = () => {
        API.getHome().then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active')
        });

    };

    init();

    _.extend($scope, {
        getContent: getContent,
        getFeaturedArticles: getFeaturedArticles,
        getArticle: getArticle
    })
});




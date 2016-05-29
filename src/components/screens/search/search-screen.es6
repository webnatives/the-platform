app.controller('SearchScreen', ($element, $timeout, API, $scope, $stateParams) => {

    var content;

    var init = () => {
        API.getPostsBySearch($stateParams.query).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active')
        });

    };

    init();

    _.extend($scope, {
        getArticle: (index) => content[index],
        getContent: () => content,
        getFeaturedArticles: () => content,
        getContentHalf: (index) => _.chunk(_.rest(content), content.length / 4)[index]
    })
});




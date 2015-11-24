app.controller('TopicScreen', ($element, $timeout, API, $scope, $stateParams) => {

    var content;

    var init = () => {
        API.getPostsByCat($stateParams.cat).then((response) => {
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




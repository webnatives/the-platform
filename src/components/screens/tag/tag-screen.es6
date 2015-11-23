app.controller('TagScreen', ($element, $timeout, API, $scope, $stateParams, $http) => {

    var content;

    var init = () => {
        API.getPostsByTag($stateParams.tag).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active')
        });
    };

    init();

    _.extend($scope, {
        getTag: () => $stateParams.tag,
        getContent: () => content,
        getContentHalf: (index) => _.chunk(content, content.length / 2)[index],
        getFeaturedArticles: () => content,
        getArticle: (index) => content[index]
    })
});




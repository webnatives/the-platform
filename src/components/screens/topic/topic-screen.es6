app.controller('TopicScreen', ($element, $timeout, API, $scope, $stateParams) => {

    var content;

    var getContent = () => content;

    var getFeaturedArticles = () => content;

    var getArticle = (index) => content[index];

    var init = () => {
        API.getPostsByCat($stateParams.cat).then((response) => {
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




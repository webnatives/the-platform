app.controller('TopicScreen', ($element, $timeout, API, $scope, $stateParams) => {

    var content;

    var getContentHalf = (index) => {
        if (!content) return;
        return _.chunk(_.tail(content), content.length / 4)[index]
    }

    var init = () => {
        API.getPostsByCat($stateParams.cat).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');

            document.title = `${$stateParams.cat} | The Platform Online`;
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        });

    };

    init();

    _.extend($scope, {
        getArticle: (index) => content[index],
        getContent: () => content,
        getFeaturedArticles: () => content,
        getContentHalf
    })
});




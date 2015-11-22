app.controller('ArticleScreen', ($element, $timeout, API, $scope, $stateParams, $sce) => {

    var content;

    var getContent = () => content;

    var init = () => {
        API.getPost($stateParams.id).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active')
        });
    };

    init();

    _.extend($scope, {
        getContent: getContent,
        trustAsHtml: $sce.trustAsHtml
    })
});




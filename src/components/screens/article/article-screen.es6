app.controller('ArticleScreen', ($element, $timeout, API, $scope, $stateParams, $sce) => {

    var content;

    var init = () => {
        API.getPost($stateParams.id).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content = content.content.split("<p>&nbsp;</p>").join("");
        });
    };

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getContent: () => content,
        getContentHalf: (index) => _.chunk(content, content.length / 2)[index]
    })
});




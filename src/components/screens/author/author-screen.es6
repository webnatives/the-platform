app.controller('AuthorScreen', ($element, $timeout, API, $scope, $stateParams, $state, Loading) => {

    var author;

    var load = () => {
        API.getAuthor($stateParams.author_id).then(response => {
            author = response;
            Loading.setActive(false);
            $element.find('[screen]').addClass('active')
        });
    };

    var getNextPage = (amount) => {

    }

    var init = () => {
        load();
    };

    init();

    _.extend($scope, {
        getAuthor: () => author
    })
});




app.controller('AuthorsScreen', ($element, $timeout, API, $scope, $stateParams, $state, Loading) => {

    var authors, page = $stateParams.page || 1;

    var load = () => {
        API.getAuthors(page).then((response) => {
            authors = response;
            Loading.setActive(false);
            $element.find('[screen]').addClass('active');

            document.title = `Our Writers | The Platform`;
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        });
    };

    var getNextPage = (amount) => {
        //page += amount
    }

    var init = () => {
        load();
    };

    init();

    _.extend($scope, {
        getAuthors: () => authors,
        getNextPage: () => (page * 1) + 1,
        getLastPage: () => (page * 1) - 1,
        getAuthorIds: () => authors.map(author => author.id)
    })
});




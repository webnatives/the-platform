app.controller('ImageListScreen', ($element, $timeout, API, $scope, $stateParams, $http) => {

    var terms;

    var init = () => {
        $element.find('[screen]').addClass('active');
        $http.get(`http://www.the-platform.org.uk/wp-json/posts?page=${$stateParams.page}&filter[posts_per_page]=50`).then((response) => terms = response.data);
    };

    init();

    _.extend($scope, {
        getTerms: () => terms
    })
});




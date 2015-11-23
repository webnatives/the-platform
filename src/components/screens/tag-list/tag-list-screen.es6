app.controller('TagListScreen', ($element, $timeout, API, $scope, $stateParams, $http) => {

    var terms;

    var init = () => {
        $element.find('[screen]').addClass('active')
        $http.get(`http://www.the-platform.org.uk/wp-json/taxonomies/post_tag/terms`).then((response) => terms = response.data);
    };

    init();

    _.extend($scope, {
        getTerms: () => terms
    })
});




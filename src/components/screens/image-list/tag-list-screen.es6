app.controller('ImageListScreen', ($element, $timeout, API, $scope, $stateParams, $http, Loading) => {

    var terms;

    var init = () => {
        $element.find('[screen]').addClass('active');
        $http.get(
            `http://www.the-platform.org.uk/wp-json/posts?page=${$stateParams.page}&filter[posts_per_page]=50`,
            {transformResponse: response => response.replace('<!-- ngg_resource_manager_marker -->', '')})
            .then((response) => {

                Loading.setActive(false);
                //console.log(response)
                terms = JSON.parse(response.data.replace('<!-- ngg_resource_manager_marker -->', ''));
                //console.log(terms)
            }, (response) => {
                //console.log(response)
            });
    };

    init();

    _.extend($scope, {
        getTerms: () => terms
    })
});




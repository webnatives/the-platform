app.directive('searchItem', () => ({
    templateUrl: 'search.html',
    controllerAs: 'search',
    scope: {},
    controller: function (Search, $scope, $state) {

        var go = (query) => {
            if (!query) return;
            $state.go('search', {query});
            Search.hide();
        };

        var init = () => {
        };

        init();

        _.extend(this, {
            go,
            isVisible: Search.isVisible,
            hide: Search.hide,
            show: Search.show
        });
    }
}));

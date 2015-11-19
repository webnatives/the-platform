app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {

    var resolve = {
        timeout($timeout) {
            $('[screen]').removeClass('active');
            //$('.loading-logo').addClass('active');
            return $timeout(300);
        }
    };

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "home-screen.html",
            controller: "HomeScreen",
            resolve: resolve
        })
        .state('article', {
            url: "/article",
            templateUrl: "article-screen.html",
            controller: "ArticleScreen",
            resolve: resolve
        });

    $locationProvider.html5Mode(true);
});
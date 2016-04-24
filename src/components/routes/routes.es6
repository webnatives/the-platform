app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {

    var resolve = {
        timeout($timeout, Loading) {
            $('[screen]').removeClass('active');
            Loading.setActive(true);
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
        .state('topic', {
            url: "/topic/:cat",
            templateUrl: "topic-screen.html",
            controller: "TopicScreen",
            resolve: resolve
        })
        .state('tag', {
            url: "/tag/:tag",
            templateUrl: "tag-screen.html",
            controller: "TagScreen",
            resolve: resolve
        })
        .state('tagList', {
            url: "/tag-list",
            templateUrl: "tag-list-screen.html",
            controller: "TagListScreen",
            resolve: resolve
        })
        .state('imageList', {
            url: "/image-list/:page",
            templateUrl: "image-list-screen.html",
            controller: "ImageListScreen",
            resolve: resolve
        })
        .state('article', {
            url: "/:year/:month/:date/:slug/?:id",
            templateUrl: "article-screen.html",
            controller: "ArticleScreen",
            resolve: resolve
        });

    $locationProvider.html5Mode(true);
});
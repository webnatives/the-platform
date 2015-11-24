'use strict';

var app = angular.module('app', ['ui.router']).run(function () {
    FastClick.attach(document.body);
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keypress', function (event) {
            if (event.which !== 13) return;
            scope.$apply(function () {
                return scope.$eval(attrs.ngEnter, { $event: event });
            });
            event.preventDefault();
        });
    };
});
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    var resolve = {
        timeout: function timeout($timeout) {
            $('[screen]').removeClass('active');
            //$('.loading-logo').addClass('active');
            return $timeout(300);
        }
    };

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "home-screen.html",
        controller: "HomeScreen",
        resolve: resolve
    }).state('topic', {
        url: "/topic/:cat",
        templateUrl: "topic-screen.html",
        controller: "TopicScreen",
        resolve: resolve
    }).state('tag', {
        url: "/tag/:tag",
        templateUrl: "tag-screen.html",
        controller: "TagScreen",
        resolve: resolve
    }).state('tagList', {
        url: "/tag-list",
        templateUrl: "tag-list-screen.html",
        controller: "TagListScreen",
        resolve: resolve
    }).state('article', {
        url: "/article/:id/:slug",
        templateUrl: "article-screen.html",
        controller: "ArticleScreen",
        resolve: resolve
    });

    $locationProvider.html5Mode(true);
});
app.controller('ScreenCtrl', function ($element, $timeout, State, $state) {

    var init = function init() {
        $timeout(function () {
            return $element.find('[screen]').addClass('active');
        }, 50);
    };

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(document).scrollTop(0);
    });

    init();
});

'use strict';

app.factory('Alert', function ($timeout, $rootScope) {

    //var active = false,
    //    message = false,
    //    colour = "",
    //    timeout;
    //
    //var showSuccess = (msg) => {
    //    showError(msg);
    //    colour = "";
    //};
    //
    //var showMessage = (msg) => {
    //    showError(msg);
    //    colour = "primary";
    //};
    //
    //var showError = (msg) => {
    //    colour = "red";
    //    setActive(true);
    //    message = msg;
    //    $timeout.cancel(timeout);
    //    timeout = $timeout(() => setActive(false), 5000);
    //};
    //
    //var getColour = () => {
    //    return colour;
    //};
    //
    //var getMessage = () => {
    //    return message;
    //};
    //
    //var getActive = () => {
    //    return active;
    //};
    //
    //var setActive = (flag) => {
    //    active = flag;
    //};
    //
    //var switchActive = () => {
    //    active = !active;
    //};
    //
    //var init = () => {
    //
    //};
    //
    //init();
    //
    //$rootScope.Alert = {
    //    showMessage: showMessage,
    //    showError: showError
    //};
    //
    //return {
    //    showMessage: showMessage,
    //    showError: showError,
    //    getMessage: getMessage,
    //    getColour: getColour,
    //    getActive: getActive,
    //    setActive: setActive,
    //    showSuccess: showSuccess,
    //    switchActive: switchActive
    //};
});
'use strict';

app.factory('API', function ($rootScope, $http) {

    var API_URL = "/api/";

    var login = function login(object) {
        return $http.get(API_URL + "login/", {
            params: object,
            headers: { 'Cache-Control': 'no-cache' }
        }).then(function (response) {
            return response.data;
        });
    };

    var getHome = function getHome() {
        return $http.get(API_URL + 'home').then(function (response) {
            return response.data;
        });
    };

    var getPost = function getPost(id) {
        return $http.get(API_URL + 'post/' + id).then(function (response) {
            return response.data;
        });
    };

    var getPosts = function getPosts() {
        return $http.get(API_URL + 'posts/').then(function (response) {
            return response.data;
        });
    };

    var getPostsByCat = function getPostsByCat(cat) {
        return $http.get(API_URL + 'posts/cat/' + cat).then(function (response) {
            return response.data;
        });
    };

    var getPostsByTag = function getPostsByTag(tag) {
        return $http.get(API_URL + 'posts/tag/' + tag).then(function (response) {
            return response.data;
        });
    };

    var getCollections = function getCollections() {
        return $http.get('' + API_URL, { headers: { 'Cache-Control': 'no-cache' } }).then(function (response) {
            return _.drop(response.data);
        });
    };

    var getCollection = function getCollection(collection) {
        return $http.get('' + API_URL + collection, { headers: { 'Cache-Control': 'no-cache' } }).then(function (response) {
            return response.data;
        });
    };

    var getDocument = function getDocument(collection, data) {
        return $http.get('' + API_URL + collection, { params: data, headers: { 'Cache-Control': 'no-cache' } }).then(function (response) {
            console.log(response.data[0]);
            return response.data[0];
        });
    };

    var insertDocument = function insertDocument(collection, data) {
        return $http.post('' + API_URL + collection, data).then(function (response) {
            return response.data;
        });
    };

    var updateDocument = function updateDocument(collection, id, data) {
        return $http.put('' + API_URL + collection + '/_id/' + id, data).then(function (response) {
            return response.data;
        });
    };

    return {
        login: login,
        getHome: getHome,
        getPost: getPost,
        getPosts: getPosts,
        getPostsByCat: getPostsByCat,
        getPostsByTag: getPostsByTag,
        getCollections: getCollections,
        getCollection: getCollection,
        getDocument: getDocument,
        insertDocument: insertDocument,
        updateDocument: updateDocument
    };
});
'use strict';

app.factory('State', function ($rootScope, $sce) {

    var title = 'Content Types';

    var setTitle = function setTitle(text) {
        return title = text;
    };

    var getTitle = function getTitle() {
        return title;
    };

    $rootScope.html = $sce.trustAsHtml;

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(document).scrollTop(0);
    });

    return {
        isMenuVisible: '',
        toggleMenu: '',
        setTitle: setTitle,
        getTitle: getTitle
    };
});
'use strict';

app.directive('alert', function (Alert) {
    return {
        templateUrl: 'alert.html',
        scope: {},

        link: function link(scope, element, attrs) {

            var init = function init() {};

            init();

            scope.getColour = Alert.getColour;
            scope.getMessage = Alert.getMessage;
            scope.getActive = Alert.getActive;
            scope.setActive = Alert.setActive;
            scope.switchActive = Alert.switchActive;
        }
    };
});

'use strict';

app.directive('footItem', function (State) {
    return {
        templateUrl: 'foot.html',
        scope: {},

        link: function link(scope, element, attrs) {

            var init = function init() {};

            init();

            scope = _.assign(scope, {
                isMenuVisible: State.isMenuVisible,
                toggleMenu: State.toggleMenu,
                getTitle: State.getTitle
            });
        }
    };
});

'use strict';

app.directive('articlePreviewItem', function (State, API, $sce) {
    return {
        templateUrl: 'article-preview.html',
        scope: {
            heading: '=',
            id: '=',
            image: '=',
            link: '=',
            summary: '=',
            height: '=',
            tag: '='
        },
        link: function link(scope, element, attrs) {

            var content;

            var getContent = function getContent() {
                return content;
            };

            var init = function init() {
                console.log('scope.id (article-preview)', scope.id);
                if (scope.id == undefined) return;
                API.getPost(scope.id).then(function (response) {
                    content = response;
                    console.log('post (article-preview)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.extend(scope, {
                getContent: getContent,
                trustAsHtml: $sce.trustAsHtml
            });
        }
    };
});

'use strict';

app.directive('groupItem', function (State, API) {
    return {
        templateUrl: 'group.html',
        scope: {
            heading: '=',
            amount: '='
        },
        link: function link(scope, element, attrs) {

            var articles,
                amount = scope.amount || 6;

            var getArticles = function getArticles() {
                return _.take(articles, amount);
            };

            var init = function init() {
                API.getPosts().then(function (response) {
                    articles = response;
                    console.log('post (article-preview)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.assign(scope, {
                getArticles: getArticles
            });
        }
    };
});

'use strict';

app.directive('headerItem', function (State) {
    return {
        templateUrl: 'header.html',
        scope: {},

        link: function link(scope, element, attrs) {

            var menuVisible = true,
                currentscroll = 0;

            var isMenuVisible = function isMenuVisible() {
                return menuVisible;
            };

            var checkScroll = function checkScroll() {
                menuVisible = $(window).scrollTop() <= currentscroll;
                currentscroll = $(window).scrollTop();
                scope.$digest();
            };

            var events = function events() {

                //$('body').on('touchmove', checkScroll);
                $(window).on('scroll', checkScroll);
            };

            var init = function init() {
                events();
            };

            init();

            scope = _.assign(scope, {
                isMenuVisible: isMenuVisible,
                toggleMenu: State.toggleMenu,
                getTitle: State.getTitle
            });
        }
    };
});

'use strict';

app.directive('heroItem', function (API, State, $sce) {
    return {
        templateUrl: 'hero.html',
        scope: {
            heading: '=',
            id: '=',
            image: '=',
            link: '=',
            summary: '=',
            height: '=',
            tag: '='
        },
        link: function link(scope, element, attrs) {

            var content;

            var getContent = function getContent() {
                return content;
            };

            var init = function init() {
                console.log('post', scope.id);
                if (scope.id == undefined) return;
                API.getPost(scope.id).then(function (response) {
                    content = response;
                    console.log('post', response);
                    element.find('.fi').addClass('active');
                    content.excerpt = content.excerpt.replace(/^(.{80}[^\s]*).*/, "$1") + "...";
                });
            };

            init();

            scope = _.extend(scope, {
                getContent: getContent,
                trustAsHtml: $sce.trustAsHtml
            });
        }
    };
});

'use strict';

app.directive('latestItem', function (State, API) {
    return {
        templateUrl: 'latest.html',
        scope: {
            heading: '=',
            amount: '='
        },
        link: function link(scope, element, attrs) {

            var articles,
                amount = scope.amount || 3;

            var getArticles = function getArticles() {
                return _.take(articles, amount);
            };

            var init = function init() {
                API.getPosts().then(function (response) {
                    articles = response;
                    console.log('post (article-preview)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.assign(scope, {
                getArticles: getArticles
            });
        }
    };
});

app.controller('ArticleScreen', function ($element, $timeout, API, $scope, $stateParams, $sce, $http) {

    var content, featured, related, image;

    var init = function init() {
        API.getPost($stateParams.id).then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content = content.content.split("<p>&nbsp;</p>").join("");

            loadRelated();
            loadImages();
        });

        API.getHome($stateParams.id).then(function (response) {
            return featured = response;
        });
    };

    var loadImages = function loadImages() {
        //var string = "";
        //for (var i in content.terms.post_tag) {
        //    string += content.terms.post_tag[i].slug + ','
        //}
        //
        //var USERNAME = 'webnatives';
        //var API_KEY = 'e378f2ef40be32ce3b06621799ad7a22';
        //var SECRET = 'e378f2ef40be32ce3b06621799ad7a22';
        //var URL = `https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=${API_KEY}&tags=${string}`;
        //$http.get(URL).then((response) => {
        //    var content = response.data.substring(0, response.data.length - 1).replace("jsonFlickrApi(", "");
        //    content = JSON.parse(content)
        //    console.log("FLICKR", content);
        //    console.warn("FLICKR", content);
        //
        //    var photo = _.shuffle(content.photos.photo)[0];
        //
        //    image = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        //    console.log("IMAGE: ------ ", image);
        //});
    };

    var loadRelated = function loadRelated() {
        var string = "";
        for (var i in content.terms.post_tag) {
            string += content.terms.post_tag[i].slug + ',';
        }
        API.getPostsByTag(string).then(function (response) {
            return related = _.shuffle(response);
        });
    };

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getImage: function getImage() {
            return image;
        },
        getContent: function getContent() {
            return content;
        },
        getRelated: function getRelated() {
            return related;
        },
        getFeatured: function getFeatured() {
            return featured.acf.featuredArticles;
        },
        getFeaturedArticle: function getFeaturedArticle(index) {
            return featured.acf.featuredArticles[index].article;
        },
        getContentHalf: function getContentHalf(index) {
            return _.chunk(content, content.length / 2)[index];
        }
    });
});

app.controller('HomeScreen', function ($element, $timeout, API, $scope) {

    var content;

    var getContent = function getContent() {
        return content;
    };

    var getFeaturedArticles = function getFeaturedArticles() {
        return content.acf.featuredArticles;
    };

    var getArticle = function getArticle(index) {
        return content.acf.featuredArticles[index].article;
    };

    var init = function init() {
        API.getHome().then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
        });
    };

    init();

    _.extend($scope, {
        getContent: getContent,
        getFeaturedArticles: getFeaturedArticles,
        getArticle: getArticle
    });
});

app.controller('TagScreen', function ($element, $timeout, API, $scope, $stateParams, $http) {

    var content;

    var init = function init() {
        API.getPostsByTag($stateParams.tag).then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
        });
    };

    init();

    _.extend($scope, {
        getTag: function getTag() {
            return $stateParams.tag;
        },
        getContent: function getContent() {
            return content;
        },
        getContentHalf: function getContentHalf(index) {
            return _.chunk(content, content.length / 2)[index];
        },
        getFeaturedArticles: function getFeaturedArticles() {
            return content;
        },
        getArticle: function getArticle(index) {
            return content[index];
        }
    });
});

app.controller('TagListScreen', function ($element, $timeout, API, $scope, $stateParams, $http) {

    var terms;

    var init = function init() {
        $element.find('[screen]').addClass('active');
        $http.get('http://www.the-platform.org.uk/wp-json/taxonomies/post_tag/terms').then(function (response) {
            return terms = response.data;
        });
    };

    init();

    _.extend($scope, {
        getTerms: function getTerms() {
            return terms;
        }
    });
});

app.controller('TopicScreen', function ($element, $timeout, API, $scope, $stateParams) {

    var content;

    var init = function init() {
        API.getPostsByCat($stateParams.cat).then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
        });
    };

    init();

    _.extend($scope, {
        getArticle: function getArticle(index) {
            return content[index];
        },
        getContent: function getContent() {
            return content;
        },
        getFeaturedArticles: function getFeaturedArticles() {
            return content;
        },
        getContentHalf: function getContentHalf(index) {
            return _.chunk(_.rest(content), content.length / 4)[index];
        }
    });
});
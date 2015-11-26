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
    }).state('imageList', {
        url: "/image-list",
        templateUrl: "image-list-screen.html",
        controller: "ImageListScreen",
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

    //var getPosts = () => $http.get(`${API_URL}posts/posts_per_page/100`).then(response => response.data);

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

app.directive('articlePreviewItem', function (State, API) {
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
                getContent: function getContent() {
                    return content;
                }
            });
        }
    };
});

'use strict';

app.directive('groupItem', function (State, API) {
    return {
        templateUrl: 'group.html',
        scope: { heading: '=', ids: '=' },
        link: function link(scope, element, attrs) {

            var articles = [];

            var init = function init() {
                _.each(scope.ids, function (id, index) {
                    console.warn(index, id);
                    API.getPost(id).then(function (response) {
                        articles.push(response);
                        console.log('post (group)', id, response);
                        element.find('.fi').addClass('active');
                    });
                });
            };

            init();

            scope = _.assign(scope, {
                getArticles: function getArticles() {
                    return articles;
                },
                getArticle: function getArticle(index) {
                    return articles[index];
                }
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

            var checkScroll = function checkScroll() {
                menuVisible = $(window).scrollTop() <= currentscroll;
                currentscroll = $(window).scrollTop();
                scope.$digest();
            };

            var events = function events() {
                $(window).on('scroll', checkScroll);
            };

            var init = function init() {
                events();
            };

            init();

            scope = _.extend(scope, {
                isMenuVisible: function isMenuVisible() {
                    return menuVisible;
                },
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

app.controller('HomeScreen', function ($element, $timeout, API, $scope) {

    var content, tags;

    var init = function init() {
        API.getHome().then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
        });
        API.getPostsByTag("labour").then(function (response) {
            return tags = response;
        });
    };

    init();

    _.extend($scope, {
        getTags: function getTags() {
            return tags;
        },
        getContent: function getContent() {
            return content;
        },
        getFeaturedArticles: function getFeaturedArticles() {
            return content.acf.featuredArticles;
        },
        getArticle: function getArticle(index) {
            return content.acf.featuredArticles[index].article;
        }
    });
});

app.controller('ArticleScreen', function ($element, $timeout, API, $scope, $stateParams, $sce, $http) {

    var content, featured, related, relatedIds, image, tags;

    var init = function init() {
        API.getPost($stateParams.id).then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content = content.content.split("<p>&nbsp;</p>").join("");

            loadRelated();
        });

        API.getHome($stateParams.id).then(function (response) {
            return featured = response;
        });
        API.getPostsByTag("paris").then(function (response) {
            return tags = response;
        });
    };

    var loadRelated = function loadRelated() {
        var string = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        _.each(content.terms.post_tag, function (tag, index) {
            return string += tag.slug + ',';
        });
        API.getPostsByTag(string).then(function (response) {
            related = _.shuffle(response);
            relatedIds = _.take(_.map(related, function (article) {
                return article.ID;
            }), 5);
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
        getTags: function getTags() {
            return tags;
        },
        getRelated: function getRelated() {
            return related;
        },
        getRelatedIds: function getRelatedIds() {
            return relatedIds;
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

app.controller('ImageListScreen', function ($element, $timeout, API, $scope, $stateParams, $http) {

    var terms;

    var init = function init() {
        $element.find('[screen]').addClass('active');
        $http.get('http://www.the-platform.org.uk/wp-json/posts?filter[posts_per_page]=50').then(function (response) {
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
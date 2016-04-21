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
        url: "/image-list/:page",
        templateUrl: "image-list-screen.html",
        controller: "ImageListScreen",
        resolve: resolve
    }).state('article', {
        url: "/:year/:month/:date/:slug/?:id",
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

    var getPostBySlug = function getPostBySlug(slug) {
        return $http.get(API_URL + 'post/slug/' + slug).then(function (response) {
            return response.data;
        });
    };

    var getPosts = function getPosts() {
        return $http.get(API_URL + 'posts/').then(function (response) {
            return response.data;
        });
    };

    var getRandomPosts = function getRandomPosts() {
        return $http.get(API_URL + 'posts/orderby/rand').then(function (response) {
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
        getPostBySlug: getPostBySlug,
        getPosts: getPosts,
        getRandomPosts: getRandomPosts,
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

app.service('Helper', function ($rootScope, $http) {

    var getDateString = function getDateString(article) {
        //console.log('getDateString', article)
        if (!article) return "/";

        return "/" + moment(article.date).format('YYYY') + "/" + moment(article.date).format('MM') + "/" + moment(article.date).format('DD') + "/" + article.slug + "/";
    };

    _.extend(this, {
        getDateString: getDateString
    });
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

app.directive('articlePreviewItem', function (State, API) {
    return {
        templateUrl: 'article-preview.html',
        scope: {
            heading: '&',
            id: '&',
            image: '&',
            link: '&',
            summary: '&',
            height: '&',
            tag: '&'
        },
        link: function link(scope, element, attrs) {

            var content;

            var _getDate = function _getDate() {
                if (content) {
                    return moment(content.date);
                } else {
                    return {};
                }
            };

            var init = function init() {
                //console.log('scope.id (article-preview)', scope.id());
                if (scope.id() == undefined) return;
                API.getPost(scope.id()).then(function (response) {
                    content = response;
                    console.log('post (article-preview)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.extend(scope, {
                getContent: function getContent() {
                    return content;
                },
                getDate: function getDate(format) {
                    return _getDate().format(format);
                }
            });
        }
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

app.directive('articleShareItem', function (API, State, Helper) {
    return {
        templateUrl: 'article-share.html',
        scope: {},
        link: function link(scope, element, attrs) {

            var init = function init() {};

            init();

            scope = _.extend(scope, {});
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

app.directive('groupItem', function (State, API, Helper) {
    return {
        templateUrl: 'group.html',
        scope: { heading: '&', ids: '&', horizontal: "&" },
        link: function link(scope, element, attrs) {

            var articles = [];

            var init = function init() {
                _.each(scope.ids(), function (id, index) {
                    return API.getPost(id).then(function (response) {
                        articles.push(response);
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
                },
                getDateString: Helper.getDateString
            });
        }
    };
});

'use strict';

app.directive('heroItem', function (API, State, Helper) {
    return {
        templateUrl: 'hero.html',
        scope: {
            heading: '&',
            id: '&',
            image: '&',
            link: '&',
            summary: '&',
            height: '&',
            tag: '&'
        },
        link: function link(scope, element, attrs) {

            var content;

            var getHeight = function getHeight() {
                return $(window).width() < 769 ? 150 : scope.height();
            };

            var init = function init() {
                //console.log('post', scope.id());
                if (scope.id() == undefined) return;

                API.getPost(scope.id()).then(function (response) {
                    content = response;
                    //console.log('post', response);
                    element.find('.fi').addClass('active');
                    content.excerpt = content.excerpt.replace(/^(.{80}[^\s]*).*/, "$1") + "...";
                });
            };

            init();

            scope = _.extend(scope, {
                getContent: function getContent() {
                    return content;
                },
                getHeight: getHeight,
                getDateString: Helper.getDateString
            });
        }
    };
});

'use strict';

app.directive('latestItem', function (State, API, Helper) {
    return {
        templateUrl: 'latest.html',
        scope: {
            heading: '&',
            amount: '&'
        },
        link: function link(scope, element, attrs) {

            var articles,
                amount = scope.amount() || 3;

            var getArticles = function getArticles() {
                return _.take(articles, amount);
            };

            var init = function init() {
                API.getPosts().then(function (response) {
                    articles = response;
                    console.log('latest (latest)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.assign(scope, {
                getArticles: getArticles,
                getDateString: Helper.getDateString
            });
        }
    };
});

app.controller('ArticleScreen', function ($element, $timeout, API, $scope, $stateParams, $sce, $http, Helper) {

    var content, featured, related, relatedIds, image, tags;

    var loadRelated = function loadRelated() {
        var string = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        _.each(content.terms.post_tag, function (tag, index) {
            return string += tag.slug + ',';
        });

        if (string != "") {
            API.getPostsByTag(string).then(function (response) {
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, function (article) {
                    return article.ID;
                }), 3);
            });
        } else {
            API.getRandomPosts(string).then(function (response) {
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, function (article) {
                    return article.ID;
                }), 3);
            });
        }
    };

    var getDate = function getDate() {
        //console.log('getDate: content',content)
        if (content) return moment(content.date, "YYYY-MM-DD").format("ddd, DD MMM YYYY");
    };

    var getFeatured = function getFeatured() {
        //console.log('getFeatured: featured',featured)
        if (featured) return featured.acf.featuredArticles;
    };

    var getSlug = function getSlug() {
        if (window.location.host) return 'http://' + window.location.host + Helper.getDateString(content);
    };

    var getFeaturedArticle = function getFeaturedArticle(index) {
        if (featured) return featured.acf.featuredArticles[index].article;
    };

    var init = function init() {
        API.getPostBySlug($stateParams.slug).then(function (response) {
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

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getSlug: getSlug,
        getImage: function getImage() {
            return image;
        },
        getContent: function getContent() {
            return content;
        },
        getDate: getDate,
        getTags: function getTags() {
            return tags;
        },
        getRelated: function getRelated() {
            return related;
        },
        getRelatedIds: function getRelatedIds() {
            return relatedIds;
        },
        getFeatured: getFeatured,
        getFeaturedArticle: getFeaturedArticle,
        getContentHalf: function getContentHalf(index) {
            return _.chunk(content, content.length / 2)[index];
        }
    });
});

'use strict';

app.directive('share', function ($timeout, Helper) {
    return {
        templateUrl: 'share.html',
        scope: {
            link: '@',
            header: '@'
        },

        link: function link(scope, element, attrs) {

            console.log('sc', scope.summary);
            console.log('sc', scope);
            console.log('sc', attrs);

            var random = _.random(0, 500);

            var getReverseClass = function getReverseClass() {
                return scope.reverse ? 'reverse' : '';
            };

            var getRandom = function getRandom() {
                return random;
            };

            var init = function init() {
                $timeout(function () {
                    return scope.ready = true;
                }, _.random(500));
                $timeout(function () {
                    return scope.ready2 = true;
                }, _.random(500));
            };

            init();

            scope = _.assign(scope, {
                getReverseClass: getReverseClass,
                getRandom: getRandom

            });
        }
    };
});

app.controller('ImageListScreen', function ($element, $timeout, API, $scope, $stateParams, $http) {

    var terms;

    var init = function init() {
        $element.find('[screen]').addClass('active');
        $http.get('http://www.the-platform.org.uk/wp-json/posts?page=' + $stateParams.page + '&filter[posts_per_page]=50').then(function (response) {
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

app.controller('HomeScreen', function ($element, $timeout, API, $scope) {

    var content, tags, international, politics, religion, culture;

    var init = function init() {
        API.getHome().then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
        });
        API.getPostsByTag("labour").then(function (response) {
            return tags = response;
        });
        API.getPostsByCat("international").then(function (response) {
            return international = response;
        });
        API.getPostsByCat("politics").then(function (response) {
            return politics = response;
        });
        API.getPostsByCat("culture").then(function (response) {
            return culture = response;
        });
        API.getPostsByCat("spirituality").then(function (response) {
            return religion = response;
        });
    };

    init();

    _.extend($scope, {
        getInternational: function getInternational() {
            return international;
        },
        getPolitics: function getPolitics() {
            return politics;
        },
        getCulture: function getCulture() {
            return culture;
        },
        getReligion: function getReligion() {
            return religion;
        },
        getTags: function getTags() {
            return tags;
        },
        getIds: function getIds(array, amount) {
            return _.take(_.map(array, function (item) {
                return item.ID;
            }), 3);
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
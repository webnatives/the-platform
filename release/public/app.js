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

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    var resolve = {
        timeout: function timeout($timeout, Loading) {
            $('[screen]').removeClass('active');
            Loading.setActive(true);
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
    }).state('about', {
        url: "/about",
        templateUrl: "team-screen.html",
        controller: "TeamScreen",
        resolve: resolve
    }).state('page', {
        url: "/page/:pageSlug",
        templateUrl: "page-screen.html",
        controller: "PageScreen",
        resolve: resolve
    }).state('tag', {
        url: "/tag/:tag",
        templateUrl: "tag-screen.html",
        controller: "TagScreen",
        resolve: resolve
    }).state('authors', {
        url: "/authors/:page",
        templateUrl: "authors-screen.html",
        controller: "AuthorsScreen",
        resolve: resolve
    }).state('author', {
        url: "/author/:author_id/:authorSlug",
        templateUrl: "author-screen.html",
        controller: "AuthorScreen",
        resolve: resolve
    }).state('search', {
        url: "/search/:query",
        templateUrl: "search-screen.html",
        controller: "SearchScreen",
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
app.service('Alert', function () {
    var visible = false,
        content = "";

    var show = function show(text) {
        console.log('showing');
        visible = true;
        content = text;
    };

    var init = function init() {};

    init();

    return {
        isVisible: function isVisible() {
            return visible;
        },
        hide: function hide() {
            return visible = false;
        },
        show: show,
        getContent: function getContent() {
            return content;
        }
    };
});

'use strict';

app.factory('API', function ($rootScope, $http) {

    var API_URL = "/api/";

    var req = function req(url, single) {
        return $http.get(url).then(function (response) {
            console.log('req response', response);
            return single ? response.data[0] : response.data;
        });
    };

    var login = function login(object) {
        return $http.get(API_URL + "login/", {
            params: object,
            headers: { 'Cache-Control': 'no-cache' }
        }).then(function (response) {
            return response.data;
        });
    };

    var getHome = function getHome() {
        return req(API_URL + 'home');
    };

    var getPageByName = function getPageByName(name) {
        return req(API_URL + 'pages/name/' + name, true);
    };

    var getAuthor = function getAuthor(id) {
        return req(API_URL + 'author/' + id);
    };

    var getAuthors = function getAuthors(page) {
        return req(API_URL + 'authors/' + page);
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

    var getPostsByAuthor = function getPostsByAuthor(author_id) {
        return $http.get(API_URL + 'posts/author/' + author_id).then(function (response) {
            return response.data;
        });
    };

    var getPostsBySearch = function getPostsBySearch(query) {
        return $http.get(API_URL + 'posts/s/' + query).then(function (response) {
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
        getAuthor: getAuthor,
        getAuthors: getAuthors,
        getPostsByAuthor: getPostsByAuthor,
        getPageByName: getPageByName,
        getPostBySlug: getPostBySlug,
        getPostsBySearch: getPostsBySearch,
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

app.service('Helper', function ($rootScope, $http, $sce) {

    var getDateString = function getDateString(article) {
        //console.log('getDateString', article)
        if (!article) return "/";

        return "/" + moment(article.date).format('YYYY') + "/" + moment(article.date).format('MM') + "/" + moment(article.date).format('DD') + "/" + article.slug + "/";
    };

    var getImage = function getImage(content) {
        return content && content._embedded && content._embedded['wp:featuredmedia'] ? content._embedded['wp:featuredmedia'][0].source_url : undefined;
    };

    var getWhen = function getWhen(content) {
        return content ? moment(content.date).fromNow() : "";
    };

    var getTitle = function getTitle(content) {
        return content ? $sce.trustAsHtml(content.title.rendered) : undefined;
    };

    var getAuthor = function getAuthor(content) {
        return content ? content._embedded.author[0] : undefined;
    };

    var getSummary = function getSummary(content) {
        return content ? $sce.trustAsHtml(content.acf.summary) : undefined;
    };

    var getExcerpt = function getExcerpt(content) {
        return content ? $sce.trustAsHtml(content.excerpt.rendered) : undefined;
    };

    var getTags = function getTags(content) {
        return content ? content._embedded['wp:term'][1] : undefined;
    };

    var getCat = function getCat(content) {
        return content ? $sce.trustAsHtml(content._embedded['wp:term'][0][0].name) : undefined;
    };

    var expose = {
        getWhen: getWhen,
        getDateString: getDateString,
        getImage: getImage,
        getTitle: getTitle,
        getExcerpt: getExcerpt,
        getSummary: getSummary,
        getTags: getTags,
        getCat: getCat,
        getAuthor: getAuthor
    };

    _.extend($rootScope, expose);
    _.extend(this, expose);
});
'use strict';

app.service('Loading', function ($timeout, $rootScope) {

    var active = false,
        currentMessage = 0;

    var messages = ['Spinning up the hamster...', 'Shovelling coal into the server...'
    //'Please wait and enjoy the elevator music...',
    //'Loading humorous message, please wait...'
    ];

    var randMsg = function randMsg() {
        currentMessage = _.random(0, messages.length - 1);
    };

    var setActive = function setActive(flag) {
        active = flag == undefined ? !active : flag;
        if (active) randMsg();
    };

    var init = function init() {
        randMsg();
    };

    init();

    var pub = {
        getActive: function getActive() {
            return active;
        },
        setActive: setActive,
        randMsg: randMsg,
        getMessage: function getMessage() {
            return messages[currentMessage];
        }
    };

    _.extend($rootScope, pub);
    _.extend(this, pub);
});
app.service('Search', function ($timeout) {
    var visible = false;

    var show = function show() {
        visible = true;
        $('.search-box input').val("");
        $timeout(function () {
            return $('.search-box input').focus();
        }, 300);
    };

    var init = function init() {};

    init();

    return {
        isVisible: function isVisible() {
            return visible;
        },
        hide: function hide() {
            return visible = false;
        },
        show: show
    };
});

'use strict';

app.factory('State', function ($rootScope, $sce, API, $timeout) {

    var customData = {};

    var title = 'Content Types';

    var setTitle = function setTitle(text) {
        return title = text;
    };

    var getTitle = function getTitle() {
        return title;
    };

    var getCustomData = function getCustomData() {
        return customData;
    };

    var events = function events() {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(document).scrollTop(0);
            $timeout(function () {}, 350);
        });
    };

    var init = function init() {
        events();
        API.getHome().then(function (response) {
            customData = response.acf;
            console.log('customData', customData);
        });
    };

    init();

    $rootScope.getCustomData = getCustomData;
    $rootScope.html = $sce.trustAsHtml;

    return {
        isMenuVisible: '',
        toggleMenu: '',
        setTitle: setTitle,
        getTitle: getTitle,
        getCustomData: getCustomData
    };
});
app.directive('alertItem', function () {
    return {
        templateUrl: 'alert.html',
        controllerAs: 'alert',
        scope: {},
        controller: function controller(Alert) {

            var init = function init() {};

            init();

            _.extend(this, {
                isVisible: Alert.isVisible,
                hide: Alert.hide,
                getContent: Alert.getContent
            });
        }
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

app.directive('authorPreviewItem', function () {
    return {
        templateUrl: 'author-preview.html',
        controllerAs: 'author',
        bindToController: true,
        scope: {
            author: '=',
            authorId: '@',
            small: '='
        },
        controller: function controller($scope, $element, State, API) {
            var _this = this;

            //console.log('authorId', this);

            var author, articles;

            var init = function init() {
                if (_this.authorId) {
                    API.getAuthor(_this.authorId).then(function (response) {
                        author = response;

                        console.log('author response', response);
                    });
                } else {
                    author = _this.author;
                }

                if (!_this.small) {
                    API.getPostsByAuthor(_this.authorId).then(function (response) {
                        articles = _.sampleSize(response, 3);

                        console.log('author articles', articles);
                    });
                }
            };

            init();

            _.extend(this, {
                getAuthor: function getAuthor() {
                    return author;
                },
                getArticles: function getArticles() {
                    return articles.map(function (article) {
                        return article.id;
                    });
                }
            });
        }
    };
});

app.directive('commentsItem', function ($timeout, Helper) {
    return {
        templateUrl: 'comments-item.html',
        scope: {
            article: '='
        },
        link: function link(scope, element, attrs) {

            var init = function init() {
                console.log('comment:', scope.article);
                var disqus_config = function disqus_config() {
                    this.page.url = 'http://www.platformonline.uk/' + Helper.getDateString(article) + '/' + scope.article.slug; // Replace PAGE_URL with your page's canonical URL variable
                    this.page.identifier = scope.article.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                };

                var d = document,
                    s = d.createElement('script');

                s.src = '//platformonlineuk.disqus.com/embed.js';

                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            };

            init();

            scope = _.assign(scope, {});
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

app.directive('flexItem', function () {
    return {
        templateUrl: 'flex.html',
        controllerAs: 'flex',
        bindToController: true,
        transclude: true,
        scope: {
            row: '=',
            wrap: '=',
            gap: '='
        },
        controller: function controller($element, $timeout) {

            var flexClass = {
                "flex-row": this.row || false,
                "flex-wrap": this.wrap || false,
                "flex-gap": this.gap || false
            };

            var init = function init() {};

            init();

            _.extend(this, {
                getFlexClass: function getFlexClass() {
                    return flexClass;
                }
            });
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

app.directive('groupItem', function (State, API, Helper) {
    return {
        templateUrl: 'group.html',
        scope: { heading: '&', ids: '&', horizontal: "&" },
        link: function link(scope, element, attrs) {

            var articles = [];

            var init = function init() {
                console.log('ids', scope.ids());
                _.each(scope.ids(), function (id, index) {
                    return API.getPost(id).then(function (response) {
                        console.log('group', id);
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

app.directive('headerItem', function (State, Search) {
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

            var getMenuItems = function getMenuItems() {
                return State.getCustomData().menuCategories;
            };

            var events = function events() {
                $(window).on('scroll', checkScroll);
            };

            var init = function init() {
                events();
            };

            init();

            scope = _.extend(scope, {
                showSearch: Search.show,
                isMenuVisible: function isMenuVisible() {
                    return menuVisible;
                },
                toggleMenu: State.toggleMenu,
                getTitle: State.getTitle,
                getMenuItems: getMenuItems
            });
        }
    };
});

'use strict';

app.directive('heroItem', function (API, State, Helper, Loading, $timeout, $rootScope) {
    return {
        templateUrl: 'hero.html',
        scope: {
            heading: '&',
            id: '@',
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
                //console.log('Hero ID', scope.id);
                if (scope.id == undefined) return;

                API.getPost(scope.id).then(function (response) {
                    Loading.setActive(false);
                    content = response;
                    //console.log('Hero post content:', content);
                    element.find('.fi').addClass('active');
                    content.excerpt.rendered = content.excerpt.rendered.replace(/^(.{80}[^\s]*).*/, "$1") + "...";

                    $("<img/>").on('load', function () {
                        return element.find('.image-holder').addClass('active');
                    }).on('error', function () {
                        return console.log("error loading image");
                    }).attr("src", $rootScope.getImage(content));
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
                    //element.find('.fi').addClass('active');
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

'use strict';

app.directive('loadingItem', function (Loading) {
    return {
        templateUrl: 'loading-item.html',
        scope: {},
        link: function link(scope, element, attrs) {

            var init = function init() {};

            init();

            _.extend(scope, {
                getActive: Loading.getActive,
                setActive: Loading.setActive,
                randMsg: Loading.randMsg,
                getMessage: Loading.getMessage
            });
        }
    };
});

app.directive('searchItem', function () {
    return {
        templateUrl: 'search.html',
        controllerAs: 'search',
        scope: {},
        controller: function controller(Search, $scope, $state) {

            var go = function go(query) {
                if (!query) return;
                $state.go('search', { query: query });
                Search.hide();
                $('.search-box input').blur();
            };

            var init = function init() {};

            init();

            _.extend(this, {
                go: go,
                isVisible: Search.isVisible,
                hide: Search.hide,
                show: Search.show
            });
        }
    };
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

app.directive('teamItem', function () {
    return {
        templateUrl: 'team.html',
        controllerAs: 'team',
        bindToController: true,
        scope: {},
        controller: function controller($timeout, State, $state) {

            var getTeam = function getTeam() {
                return State.getCustomData().team;
            };

            var goAuthor = function goAuthor(member) {
                if (member.author) $state.go('author', { author_id: member.author.ID, authorSlug: member.author.user_nicename });
            };

            var init = function init() {};

            init();

            _.extend(this, {
                getTeam: getTeam,
                goAuthor: goAuthor

            });
        }
    };
});

app.directive('templateItem', function () {
    return {
        templateUrl: 'template.html',
        controllerAs: 'template',
        bindToController: true,
        scope: {},
        controller: function controller($timeout) {

            var init = function init() {};

            init();

            _.extend(this, {});
        }
    };
});

app.controller('ArticleScreen', function ($element, $timeout, API, $scope, $stateParams, $sce, $http, Helper, $rootScope) {

    var content, featured, related, relatedIds, image, tags;

    var loadRelated = function loadRelated() {
        var string = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        console.log('random z', content);
        _.each($rootScope.getTags(content), function (tag, index) {
            return string += tag.slug + ',';
        });
        console.log('random a');

        if (string != "") {
            API.getPostsByTag(string).then(function (response) {
                console.log('random 1', response);
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, function (article) {
                    console.log('related ids', article);return article.id;
                }), 3);
            });
        } else {
            API.getRandomPosts(string).then(function (response) {
                console.log('random 2', response);
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, function (article) {
                    console.log('related ids', article);return article.id;
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
            content.content.rendered = content.content.rendered.split("<p>&nbsp;</p>").join("");

            document.title = content.title.rendered + ' | The Platform';
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

app.controller('AuthorScreen', function ($element, $timeout, API, $scope, $stateParams, $state, Loading) {

    var author, articles;

    var load = function load() {
        API.getAuthor($stateParams.author_id).then(function (response) {
            console.log('author details', response);
            author = response;
            Loading.setActive(false);
            $element.find('[screen]').addClass('active');

            document.title = author.name + ' | The Platform Online';
        });

        API.getPostsByAuthor($stateParams.author_id).then(function (response) {
            articles = response;

            console.log('author articles', articles);
        });
    };

    var getNextPage = function getNextPage(amount) {};

    var init = function init() {
        load();
    };

    init();

    _.extend($scope, {
        getAuthor: function getAuthor() {
            return author;
        },
        getArticles: function getArticles() {
            return articles;
        },
        getArticleIds: function getArticleIds() {
            return articles.map(function (article) {
                return article.id;
            });
        }
    });
});

app.controller('AuthorsScreen', function ($element, $timeout, API, $scope, $stateParams, $state, Loading) {

    var authors,
        page = $stateParams.page || 1;

    var load = function load() {
        API.getAuthors(page).then(function (response) {
            authors = response;
            Loading.setActive(false);
            $element.find('[screen]').addClass('active');

            document.title = 'Our Writers | The Platform';
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        });
    };

    var getNextPage = function getNextPage(amount) {
        //page += amount
    };

    var init = function init() {
        load();
    };

    init();

    _.extend($scope, {
        getAuthors: function getAuthors() {
            return authors;
        },
        getNextPage: function getNextPage() {
            return page * 1 + 1;
        },
        getLastPage: function getLastPage() {
            return page * 1 - 1;
        },
        getAuthorIds: function getAuthorIds() {
            return authors.map(function (author) {
                return author.id;
            });
        }
    });
});

app.controller('ImageListScreen', function ($element, $timeout, API, $scope, $stateParams, $http, Loading) {

    var terms;

    var init = function init() {
        $element.find('[screen]').addClass('active');
        $http.get('http://www.the-platform.org.uk/wp-json/posts?page=' + $stateParams.page + '&filter[posts_per_page]=50', { transformResponse: function transformResponse(response) {
                return response.replace('<!-- ngg_resource_manager_marker -->', '');
            } }).then(function (response) {

            Loading.setActive(false);
            console.log(response);
            terms = JSON.parse(response.data.replace('<!-- ngg_resource_manager_marker -->', ''));
            console.log(terms);
        }, function (response) {
            console.log(response);
        });
    };

    init();

    _.extend($scope, {
        getTerms: function getTerms() {
            return terms;
        }
    });
});

app.controller('HomeScreen', function ($element, $timeout, API, $scope, Loading, Alert, State) {

    var content,
        tags,
        international,
        politics,
        religion,
        culture,
        tag,
        catPosts = [];

    var subscribe = function subscribe() {
        Alert.show("Thanks for subscribing!");
    };

    var getTagPosts = function getTagPosts() {
        API.getPostsByTag(content.acf.featuredTag).then(function (response) {
            return tags = _.sampleSize(response, 3);
        });
        content.acf.featuredCategories.forEach(function (cat) {
            API.getPostsByCat(cat.slug).then(function (posts) {
                catPosts.push(posts);
                console.log('catPosts', catPosts);
            });
        });
    };

    var init = function init() {
        Loading.setActive(true);
        API.getHome().then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            getTagPosts();

            document.title = 'The Platform - ' + State.getCustomData().shortStrapline;
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        });
    };

    init();

    _.extend($scope, {
        subscribe: subscribe,
        getPostsByTag: API.getPostsByTag,
        getCatNames: function getCatNames() {
            return content.acf.featuredCategories;
        },
        getCatPosts: function getCatPosts() {
            return catPosts;
        },
        getTag: function getTag() {
            return content.acf.featuredTag;
        },
        getTags: function getTags() {
            return tags;
        },
        getIds: function getIds(array, amount) {
            return _.take(_.map(array, function (item) {
                return item.id;
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

app.controller('PageScreen', function ($scope, $element, Loading, API, $stateParams) {

    var content;

    var init = function init() {
        document.title = $stateParams.pageSlug + ' | The Platform';

        API.getPageByName($stateParams.pageSlug).then(function (response) {
            $element.find('[screen]').addClass('active');
            document.title = response.title.rendered + ' | The Platform';
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');

            Loading.setActive(false);
            console.log('PAGE: ' + $stateParams.pageSlug, response);

            content = response;
        });
    };

    init();

    _.extend($scope, {
        getContent: function getContent() {
            return content;
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

            document.title = '#' + $stateParams.tag + ' | The Platform';
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
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

app.controller('SearchScreen', function ($element, $timeout, API, $scope, $stateParams, $state, Loading) {

    var content,
        query = $stateParams.query;

    var init = function init() {
        if (!$stateParams.query) {
            content = false;
            Loading.setActive(false);
            $state.go('home');
            return;
        }

        document.title = 'Search Results for: ' + $stateParams.query + ' | The Platform';
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');

        API.getPostsBySearch($stateParams.query).then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            Loading.setActive(false);
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
        getQuery: function getQuery() {
            return query;
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

app.controller('TeamScreen', function ($scope, $element, Loading, API, $stateParams) {

    var content;

    var init = function init() {
        document.title = 'About Us | The Platform';
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');

        $element.find('[screen]').addClass('active');

        API.getPageByName('about').then(function (response) {
            Loading.setActive(false);
            console.log('about', response);
            content = response;
        });
    };

    init();

    _.extend($scope, {
        getContent: function getContent() {
            return content;
        }
    });
});

app.controller('TopicScreen', function ($element, $timeout, API, $scope, $stateParams) {

    var content;

    var getContentHalf = function getContentHalf(index) {
        if (!content) return;
        return _.chunk(_.tail(content), content.length / 4)[index];
    };

    var init = function init() {
        API.getPostsByCat($stateParams.cat).then(function (response) {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');

            document.title = $stateParams.cat + ' | The Platform';
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        });
    };

    init();

    _.extend($scope, {
        getArticles: function getArticles() {
            return content;
        },
        getArticle: function getArticle(index) {
            return content[index];
        },
        getContent: function getContent() {
            return content;
        },
        getFeaturedArticles: function getFeaturedArticles() {
            return content;
        },
        getContentHalf: getContentHalf
    });
});
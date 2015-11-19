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
    }).state('article', {
        url: "/article",
        templateUrl: "article-screen.html",
        controller: "ArticleScreen",
        resolve: resolve
    });

    $locationProvider.html5Mode(true);
});
'use strict';

app.factory('Alert', function ($timeout, $rootScope) {

    var active = false,
        message = false,
        colour = "",
        timeout;

    var showSuccess = function showSuccess(msg) {
        showError(msg);
        colour = "";
    };

    var showMessage = function showMessage(msg) {
        showError(msg);
        colour = "primary";
    };

    var showError = function showError(msg) {
        colour = "red";
        setActive(true);
        message = msg;
        $timeout.cancel(timeout);
        timeout = $timeout(function () {
            return setActive(false);
        }, 5000);
    };

    var getColour = function getColour() {
        return colour;
    };

    var getMessage = function getMessage() {
        return message;
    };

    var getActive = function getActive() {
        return active;
    };

    var setActive = function setActive(flag) {
        active = flag;
    };

    var switchActive = function switchActive() {
        active = !active;
    };

    var init = function init() {};

    init();

    $rootScope.Alert = {
        showMessage: showMessage,
        showError: showError
    };

    return {
        showMessage: showMessage,
        showError: showError,
        getMessage: getMessage,
        getColour: getColour,
        getActive: getActive,
        setActive: setActive,
        showSuccess: showSuccess,
        switchActive: switchActive
    };
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
        getCollections: getCollections,
        getCollection: getCollection,
        getDocument: getDocument,
        insertDocument: insertDocument,
        updateDocument: updateDocument
    };
});
'use strict';

app.factory('State', function ($rootScope) {

    var menuVisible = false,
        title = 'Content Types';

    var isMenuVisible = function isMenuVisible() {
        return menuVisible;
    };

    var toggleMenu = function toggleMenu() {
        return menuVisible = !menuVisible;
    };

    var setTitle = function setTitle(text) {
        return title = text;
    };

    var getTitle = function getTitle() {
        return title;
    };

    return {
        isMenuVisible: isMenuVisible,
        toggleMenu: toggleMenu,
        setTitle: setTitle,
        getTitle: getTitle
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

app.directive('articlePreviewItem', function (State) {
    return {
        templateUrl: 'article-preview.html',
        scope: {},
        link: function link(scope, element, attrs) {

            scope.getRandom = function () {
                return _.random(100);
            };

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

app.directive('heroItem', function (State) {
    return {
        templateUrl: 'hero.html',
        scope: {
            heading: '=',
            image: '=',
            link: '=',
            summary: '=',
            height: '=',
            tag: '='
        },
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

app.directive('latestItem', function (State) {
    return {
        templateUrl: 'latest.html',
        scope: {
            heading: '='
        },
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

app.directive('latestPreviewItem', function (State) {
    return {
        templateUrl: 'latest-preview.html',
        scope: {},
        link: function link(scope, element, attrs) {

            scope.getRandom = function () {
                return _.random(100);
            };

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

app.controller('HomeScreen', function ($element, $timeout, API, $scope) {

    var init = function init() {
        $timeout(function () {
            return $element.find('[screen]').addClass('active');
        }, 50);
    };

    init();
});

app.controller('ArticleScreen', function ($element, $timeout, API, $scope) {

    var init = function init() {
        $timeout(function () {
            return $element.find('[screen]').addClass('active');
        }, 50);
    };

    init();
});
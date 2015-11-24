'use strict';

app.factory('State', function ($rootScope, $sce) {

    var title = 'Content Types';

    var setTitle = text => title = text;

    var getTitle = () => title;

    $rootScope.html = $sce.trustAsHtml;

    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        $(document).scrollTop(0);
    });

    return {
        isMenuVisible: '',
        toggleMenu: '',
        setTitle: setTitle,
        getTitle: getTitle
    };
});
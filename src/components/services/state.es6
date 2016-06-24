'use strict';

app.factory('State', function ($rootScope, $sce, API, $timeout) {

    var customData = {};

    var title = 'Content Types';

    var setTitle = text => title = text;

    var getTitle = () => title;

    var getCustomData = () => customData;

    var events = () => {
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            $(document).scrollTop(0);
            $timeout(() => {
            }, 350);
        });
    };

    var init = () => {
        events();
        API.getHome().then(response => {
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
        setTitle,
        getTitle,
        getCustomData
    };
});
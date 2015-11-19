'use strict';

app.factory('State', function ($rootScope) {

    var menuVisible = false,
        title = 'Content Types';

    var isMenuVisible = () => menuVisible;

    var toggleMenu = () => menuVisible = !menuVisible;

    var setTitle = text => title = text;

    var getTitle = () => title;

    return {
        isMenuVisible: isMenuVisible,
        toggleMenu: toggleMenu,
        setTitle: setTitle,
        getTitle: getTitle
    };
});
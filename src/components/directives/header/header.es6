'use strict';

app.directive('headerItem', (State, Search) => ({
    templateUrl: 'header.html',
    scope: {},

    link(scope, element, attrs) {

        var menuVisible = true, currentscroll = 0;

        var checkScroll = () => {
            menuVisible = $(window).scrollTop() <= currentscroll;
            currentscroll = $(window).scrollTop();
            scope.$digest();
        };

        var getMenuItems = () => State.getCustomData().menuCategories

        var events = () => {
            $(window).on('scroll', checkScroll);
        };

        var init = () => {
            events();
        };

        init();

        scope = _.extend(scope, {
            showSearch: Search.show,
            isMenuVisible: () => menuVisible,
            toggleMenu: State.toggleMenu,
            getTitle: State.getTitle,
            getMenuItems
        });
    }
}));

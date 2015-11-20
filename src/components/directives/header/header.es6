'use strict';

app.directive('headerItem', (State) => {
    return {
        templateUrl: 'header.html',
        scope: {},

        link(scope, element, attrs) {

            var menuVisible = true, currentscroll = 0;

            var isMenuVisible = () => menuVisible;

            var events = () => {
                $(window).scroll(() => {
                    //console.log('$(window).scrollTop()', $(window).scrollTop());
                    //console.log('menuVisible', menuVisible);
                    menuVisible = $(window).scrollTop() < currentscroll;
                    currentscroll = $(window).scrollTop();
                    scope.$digest();
                });
            };

            var init = () => {
                events();
            };

            init();

            scope = _.assign(scope, {
                isMenuVisible: isMenuVisible,
                toggleMenu: State.toggleMenu,
                getTitle: State.getTitle
            });
        }
    }
});

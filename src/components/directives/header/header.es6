'use strict';

app.directive('headerItem', (State) => {
    return {
        templateUrl: 'header.html',
        scope: {},

        link(scope, element, attrs) {

            var menuVisible = true, currentscroll = 0;

            var isMenuVisible = () => menuVisible;

            var checkScroll= () => {
                menuVisible = $(window).scrollTop() <= currentscroll;
                currentscroll = $(window).scrollTop();
                scope.$digest();
            };

            var events = () => {

                //$('body').on('touchmove', checkScroll);
                $(window).on('scroll', checkScroll);
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

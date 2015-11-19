'use strict';

app.directive('headerItem', (State) => {
    return {
        templateUrl: 'header.html',
        scope: {},

        link(scope, element, attrs) {

            var init = () => {
            };

            init();

            scope = _.assign(scope, {
                isMenuVisible: State.isMenuVisible,
                toggleMenu: State.toggleMenu,
                getTitle: State.getTitle
            });
        }
    }
});

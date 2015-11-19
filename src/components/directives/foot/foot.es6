'use strict';

app.directive('footItem', (State) => {
    return {
        templateUrl: 'foot.html',
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

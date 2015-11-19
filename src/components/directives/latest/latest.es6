'use strict';

app.directive('latestItem', (State) => {
    return {
        templateUrl: 'latest.html',
        scope: {
            heading:'='
        },
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

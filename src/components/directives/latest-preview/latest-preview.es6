'use strict';

app.directive('latestPreviewItem', (State) => {
    return {
        templateUrl: 'latest-preview.html',
        scope: {},
        link(scope, element, attrs) {

            var random = _.random(100);

            scope.getRandom = () => random;

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

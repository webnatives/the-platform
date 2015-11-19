'use strict';

app.directive('latestPreviewItem', (State) => {
    return {
        templateUrl: 'latest-preview.html',
        scope: {},
        link(scope, element, attrs) {

           scope.getRandom = () => _.random(100);

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

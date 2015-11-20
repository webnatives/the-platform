'use strict';

app.directive('articlePreviewItem', (State) => {
    return {
        templateUrl: 'article-preview.html',
        scope: {},
        link(scope, element, attrs) {

            var random = _.random(100)

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

'use strict';

app.directive('articlePreviewItem', (State) => {
    return {
        templateUrl: 'article-preview.html',
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

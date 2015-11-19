'use strict';

app.directive('heroItem', (State) => {
    return {
        templateUrl: 'hero.html',
        scope: {
            heading:'=',
            image:'=',
            link:'=',
            summary:'=',
            height:'=',
            tag:'='
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

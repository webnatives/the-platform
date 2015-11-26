'use strict';

app.directive('heroItem', (API, State) => ({
    templateUrl: 'hero.html',
    scope: {
        heading: '=',
        id: '=',
        image: '=',
        link: '=',
        summary: '=',
        height: '=',
        tag: '='
    },
    link(scope, element, attrs) {

        var content;

        var getHeight = () => $(window).width() < 769 ? 150 : scope.height;

        var init = () => {
            console.log('post', scope.id);
            if (scope.id == undefined) return;

            API.getPost(scope.id).then((response) => {
                content = response;
                console.log('post', response);
                element.find('.fi').addClass('active');
                content.excerpt = content.excerpt.replace(/^(.{80}[^\s]*).*/, "$1") + "...";
            });
        };

        init();

        scope = _.extend(scope, {
            getContent: () => content,
            getHeight: getHeight
        });
    }
}));

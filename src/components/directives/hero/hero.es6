'use strict';

app.directive('heroItem', (API, State, Helper, Loading, $timeout, $rootScope) => ({
    templateUrl: 'hero.html',
    scope: {
        heading: '&',
        id: '@',
        image: '&',
        link: '&',
        summary: '&',
        height: '&',
        tag: '&'
    },
    link(scope, element, attrs) {

        var content;

        var getHeight = () => $(window).width() < 769 ? 150 : scope.height();

        var init = () => {
            ////console.log('Hero ID', scope.id);
            if (scope.id == undefined) return;

            API.getPost(scope.id).then((response) => {
                Loading.setActive(false);
                content = response;
                ////console.log('Hero post content:', content);
                element.find('.fi').addClass('active');
                content.excerpt.rendered = content.excerpt.rendered.replace(/^(.{80}[^\s]*).*/, "$1") + "...";

                $("<img/>")
                    .on('load', () => element.find('.image-holder').addClass('active'))
                    .on('error', () => //console.log("error loading image"))
                    .attr("src", $rootScope.getImage(content))
                ;
            });

        };

        init();

        scope = _.extend(scope, {
            getContent: () => content,
            getHeight,
            getDateString: Helper.getDateString
        });
    }
}));

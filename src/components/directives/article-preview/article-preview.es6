'use strict';

app.directive('articlePreviewItem', (State, API, $sce) => {
    return {
        templateUrl: 'article-preview.html',
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

            var getContent = () => content;

            var init = () => {
                console.log('scope.id (article-preview)', scope.id);
                if (scope.id == undefined) return;
                API.getPost(scope.id).then((response) => {
                    content = response;
                    console.log('post (article-preview)', response);
                    element.find('.fi').addClass('active');
                });
            };

            init();

            scope = _.extend(scope, {
                getContent: getContent,
                trustAsHtml: $sce.trustAsHtml
            });
        }
    }
});

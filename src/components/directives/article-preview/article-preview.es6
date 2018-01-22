'use strict';

app.directive('articlePreviewItem', (State, API) => ({
    templateUrl: 'article-preview.html',
    scope: {
        heading: '&',
        id: '&',
        image: '&',
        link: '&',
        summary: '&',
        height: '&',
        tag: '&'
    },
    link(scope, element, attrs) {

        var content;

        var getDate = () => {
            if (content) {
                return moment(content.date);
            } else {
                return {}
            }
        };

        var init = () => {
            ////console.log('scope.id (article-preview)', scope.id());
            if (scope.id() == undefined) return;
            API.getPost(scope.id()).then((response) => {
                content = response;
                //console.log('post (article-preview)', response);
                element.find('.fi').addClass('active');
            });
        };

        init();

        scope = _.extend(scope, {
            getContent: () => content,
            getDate: (format) => getDate().format(format)
        });
    }
}));

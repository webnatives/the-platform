app.directive('commentsItem', ($timeout, Helper) => ({
    templateUrl: 'comments-item.html',
    scope: {
        article: '='
    },
    link(scope, element, attrs) {

        var init = () => {
            console.log('comment:', scope.article);
            var disqus_config = function () {
                this.page.url = `http://www.platformonline.uk/${Helper.getDateString(article)}/${scope.article.slug}`;  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = scope.article.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };

            var d = document, s = d.createElement('script');

            s.src = '//platformonlineuk.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        };

        init();

        scope = _.assign(scope, {});
    }
}));

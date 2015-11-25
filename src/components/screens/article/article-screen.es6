app.controller('ArticleScreen', ($element, $timeout, API, $scope, $stateParams, $sce, $http) => {

    var content, featured, related, relatedIds, image, tags;

    var init = () => {
        API.getPost($stateParams.id).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content = content.content.split("<p>&nbsp;</p>").join("");

            loadRelated();

        });

        API.getHome($stateParams.id).then((response) => featured = response);
        API.getPostsByTag("paris").then((response) => tags = response);
    };

    var loadRelated = (string = "") => {
        _.each(content.terms.post_tag, (tag, index) => string += tag.slug + ',');
        API.getPostsByTag(string).then((response) => {
            related = _.shuffle(response);
            relatedIds = _.take(_.map(related, (article) => article.ID), 3);
        });
    };

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getImage: () => image,
        getContent: () => content,
        getTags: () => tags,
        getRelated: () => related,
        getRelatedIds: () => relatedIds,
        getFeatured: () => featured.acf.featuredArticles,
        getFeaturedArticle: (index) => featured.acf.featuredArticles[index].article,
        getContentHalf: (index) => _.chunk(content, content.length / 2)[index]
    })
});




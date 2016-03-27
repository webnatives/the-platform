app.controller('ArticleScreen', ($element, $timeout, API, $scope, $stateParams, $sce, $http) => {

    var content, featured, related, relatedIds, image, tags;

    var loadRelated = (string = "") => {
        _.each(content.terms.post_tag, (tag, index) => string += tag.slug + ',');

        if (string != "") {
            API.getPostsByTag(string).then((response) => {
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, (article) => article.ID), 3);
            });
        } else {
            API.getRandomPosts(string).then((response) => {
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, (article) => article.ID), 3);
            });
        }
    };

    var getDate = () => {
        return moment(content.date, "YYYY-MM-DD").format("ddd, DD MMM YYYY")
    };

    var init = () => {
        API.getPostBySlug($stateParams.slug).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content = content.content.split("<p>&nbsp;</p>").join("");

            loadRelated();

        });

        API.getHome($stateParams.id).then((response) => featured = response);
        API.getPostsByTag("paris").then((response) => tags = response);
    };

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getImage: () => image,
        getContent: () => content,
        getDate: getDate,
        getTags: () => tags,
        getRelated: () => related,
        getRelatedIds: () => relatedIds,
        getFeatured: () => featured.acf.featuredArticles,
        getFeaturedArticle: (index) => featured.acf.featuredArticles[index].article,
        getContentHalf: (index) => _.chunk(content, content.length / 2)[index]
    })
});




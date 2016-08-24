app.controller('ArticleScreen', ($element, $timeout, API, $scope, $stateParams, $sce, $http, Helper, $rootScope) => {

    var content, featured, related, relatedIds, image, tags;

    var loadRelated = (string = "") => {
        console.log('random z', content);
        _.each($rootScope.getTags(content), (tag, index) => string += tag.slug + ',');
        console.log('random a');

        if (string != "") {
            API.getPostsByTag(string).then((response) => {
                console.log('random 1', response);
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, (article) => {console.log('related ids', article); return article.id}), 3);
            });
        } else {
            API.getRandomPosts(string).then((response) => {
                console.log('random 2', response);
                related = _.shuffle(response);
                relatedIds = _.take(_.map(related, (article) => {console.log('related ids', article); return article.id}), 3);
            });
        }
    };

    var getDate = () => {
        //console.log('getDate: content',content)
        if (content) return moment(content.date, "YYYY-MM-DD").format("ddd, DD MMM YYYY")
    };


    var getFeatured = () => {
        //console.log('getFeatured: featured',featured)
         if (featured) return featured.acf.featuredArticles;
    };

    var getSlug = () => {
        if (window.location.host) return 'http://' + window.location.host + Helper.getDateString(content);
    };

    var getFeaturedArticle = (index) => {
         if (featured) return featured.acf.featuredArticles[index].article;
    };

    var init = () => {
        API.getPostBySlug($stateParams.slug).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content.rendered = content.content.rendered.split("<p>&nbsp;</p>").join("");

            document.title = `${content.title.rendered} | The Platform`;
            loadRelated();
        });

        API.getHome($stateParams.id).then((response) => featured = response);
        API.getPostsByTag("paris").then((response) => tags = response);
    };

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getSlug,
        getImage: () => image,
        getContent: () => content,
        getDate,
        getTags: () => tags,
        getRelated: () => related,
        getRelatedIds: () => relatedIds,
        getFeatured,
        getFeaturedArticle,
        getContentHalf: (index) => _.chunk(content, content.length / 2)[index]
    })
});




app.controller('HomeScreen', ($element, $timeout, API, $scope) => {

    var content, tags, international, politics, religion, culture;

    var init = () => {
        API.getHome().then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active')
        });
        API.getPostsByTag("labour").then((response) => tags = response);
        API.getPostsByCat("international").then((response) => international = response);
        API.getPostsByCat("politics").then((response) => politics = response);
        API.getPostsByCat("culture").then((response) => culture = response);
        API.getPostsByCat("spirituality").then((response) => religion = response);

    };

    init();

    _.extend($scope, {
        getInternational: () => international,
        getPolitics: () => politics,
        getCulture: () => culture,
        getReligion: () => religion,
        getTags: () => tags,
        getIds: (array, amount) => _.take(_.map(array, (item) => item.ID), 3),
        getContent: () => content,
        getFeaturedArticles: () => content.acf.featuredArticles,
        getArticle: (index) => content.acf.featuredArticles[index].article
    });
});




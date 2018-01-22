app.controller('HomeScreen', ($element, $timeout, API, $scope, Loading, Alert, State) => {

    var content, tags, international, politics, religion, culture, tag, catPosts = [];

    var subscribe = () => {
        Alert.show("Thanks for subscribing!")
    };

    var getTagPosts = () => {
        API.getPostsByTag(content.acf.featuredTag).then((response) => tags = _.sampleSize(response, 3));
        content.acf.featuredCategories.forEach(cat => {
            API.getPostsByCat(cat.slug).then(posts => {
                catPosts.push(posts);
                //console.log('catPosts', catPosts)
            })
        })
    };

    var init = () => {
        Loading.setActive(true);
        API.getHome().then((response) => {
            content = response;
            //console.log('content', content);
            $element.find('[screen]').addClass('active');
            getTagPosts();

            document.title = `The Platform - ${State.getCustomData().shortStrapline}`;
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');
        });
    };

    init();

    _.extend($scope, {
        subscribe,
        getPostsByTag: API.getPostsByTag,
        getCatNames: () => content.acf.featuredCategories,
        getCatPosts: () => catPosts,
        getTag: () => content.acf.featuredTag,
        getTags: () => tags,
        getIds: (array, amount) => _.take(_.map(array, (item) => item.id), 3),
        getContent: () => content,
        getFeaturedArticles: () => content.acf.featuredArticles,
        getArticle: (index) => content.acf.featuredArticles[index].article
    });
});




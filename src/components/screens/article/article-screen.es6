app.controller('ArticleScreen', ($element, $timeout, API, $scope, $stateParams, $sce, $http) => {

    var content, featured, related, image;

    var init = () => {
        API.getPost($stateParams.id).then((response) => {
            content = response;
            console.log('content', content);
            $element.find('[screen]').addClass('active');
            content.content = content.content.split("<p>&nbsp;</p>").join("");

            loadRelated();
            loadImages();

        });

        API.getHome($stateParams.id).then((response) => featured = response);
    };

    var loadImages = () => {
        //var string = "";
        //for (var i in content.terms.post_tag) {
        //    string += content.terms.post_tag[i].slug + ','
        //}
        //
        //var USERNAME = 'webnatives';
        //var API_KEY = 'e378f2ef40be32ce3b06621799ad7a22';
        //var SECRET = 'e378f2ef40be32ce3b06621799ad7a22';
        //var URL = `https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=${API_KEY}&tags=${string}`;
        //$http.get(URL).then((response) => {
        //    var content = response.data.substring(0, response.data.length - 1).replace("jsonFlickrApi(", "");
        //    content = JSON.parse(content)
        //    console.log("FLICKR", content);
        //    console.warn("FLICKR", content);
        //
        //    var photo = _.shuffle(content.photos.photo)[0];
        //
        //    image = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        //    console.log("IMAGE: ------ ", image);
        //});
    };

    var loadRelated = () => {
        var string = "";
        for (var i in content.terms.post_tag) {
            string += content.terms.post_tag[i].slug + ','
        }
        API.getPostsByTag(string).then((response) => related = _.shuffle(response));
    };

    init();

    _.extend($scope, {
        trustAsHtml: $sce.trustAsHtml,
        getImage: () => image,
        getContent: () => content,
        getRelated: () => related,
        getFeatured: () => featured.acf.featuredArticles,
        getFeaturedArticle: (index) => featured.acf.featuredArticles[index].article,
        getContentHalf: (index) => _.chunk(content, content.length / 2)[index]
    })
});




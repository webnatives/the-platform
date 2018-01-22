'use strict';

app.factory('API', function ($rootScope, $http) {

    var API_URL = "/api/";

    var req = (url, single) => {
        return $http.get(url).then(response => {
            //console.log('req response', response)
            return single ? response.data[0] : response.data;
        });
    };

    var login = (object) => {
        return $http.get(API_URL + "login/", {
            params: object,
            headers: {'Cache-Control': 'no-cache'}
        }).then((response) => response.data);
    };

    var getHome = () => req(`${API_URL}home`);

    var getPageByName = (name) => req(`${API_URL}pages/name/${name}`, true);

    var getAuthor = (id) => req(`${API_URL}author/${id}`);

    var getAuthors = (page) => req(`${API_URL}authors/${page}`);

    var getPost = (id) => $http.get(`${API_URL}post/${id}`).then(response => response.data);

    var getPostBySlug = (slug) => $http.get(`${API_URL}post/slug/${slug}`).then(response => response.data);

    var getPosts = () => $http.get(`${API_URL}posts/`).then(response => response.data);

    var getRandomPosts = () => $http.get(`${API_URL}posts/orderby/rand`).then(response => response.data);

    var getPostsByCat = (cat) => $http.get(`${API_URL}posts/cat/${cat}`).then(response => response.data);

    var getPostsByAuthor = (author_id) => $http.get(`${API_URL}posts/author/${author_id}`).then(response => response.data);

    var getPostsBySearch = (query) => $http.get(`${API_URL}posts/s/${query}`).then(response => response.data);

    var getPostsByTag = (tag) => $http.get(`${API_URL}posts/tag/${tag}`).then(response => response.data);

    var getCollections = () => $http.get(`${API_URL}`, {headers: {'Cache-Control': 'no-cache'}}).then((response) => _.drop(response.data));

    var getCollection = (collection) => $http.get(`${API_URL}${collection}`, {headers: { 'Cache-Control' : 'no-cache' } }).then((response) => response.data);

    var getDocument = (collection, data) => $http.get(`${API_URL}${collection}`, {params: data, headers: { 'Cache-Control' : 'no-cache' } }).then((response) => response.data[0]);

    var insertDocument = (collection, data) => $http.post(`${API_URL}${collection}`, data).then((response) => response.data);

    var updateDocument = (collection, id, data) => $http.put(`${API_URL}${collection}/_id/${id}`, data).then((response) => response.data);

    return {
        login,
        getHome,
        getPost,
        getAuthor,
        getAuthors,
        getPostsByAuthor,
        getPageByName,
        getPostBySlug,
        getPostsBySearch,
        getPosts,
        getRandomPosts,
        getPostsByCat,
        getPostsByTag,
        getCollections,
        getCollection,
        getDocument,
        insertDocument,
        updateDocument
    }
});
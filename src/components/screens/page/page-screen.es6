app.controller('PageScreen', ($scope, $element, Loading, API, $stateParams) => {

    var content;

    var init = () => {
        document.title = `${$stateParams.pageSlug} | The Platform Online`;


        API.getPageByName($stateParams.pageSlug).then(response => {
            $element.find('[screen]').addClass('active');
            document.title = `${response.title.rendered} | The Platform Online`;
            ga('set', 'page', window.location.pathname);
            ga('send', 'pageview');

            Loading.setActive(false);
            console.log(`PAGE: ${$stateParams.pageSlug}`, response);

            content = response;
        });
    };

    init();

    _.extend($scope, {
        getContent:() => content
    });
});




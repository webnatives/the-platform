app.controller('TeamScreen', ($scope, $element, Loading, API, $stateParams) => {

    var content;

    var init = () => {
        document.title = `About Us | The Platform`;
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');

        $element.find('[screen]').addClass('active');

        API.getPageByName('about').then(response => {
            Loading.setActive(false);
            console.log('about', response);
            content = response;
        });
    };

    init();

    _.extend($scope, {
        getContent:() => content
    });
});




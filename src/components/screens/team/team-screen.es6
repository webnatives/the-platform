app.controller('TeamScreen', ($scope) => {

    var init = () => {
        document.title = `Our Team | The Platform Online`;
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');
    };

    init();

    _.extend($scope, {

    })
});




app.directive('templateItem', () => ({
    templateUrl: 'template.html',
    controllerAs: 'template',
    bindToController: true,
    scope: {},
    controller($timeout) {

        var init = () => {};

        init();

        _.extend(this, {
        });
    }
}));

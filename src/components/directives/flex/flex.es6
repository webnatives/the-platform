app.directive('flexItem', () => ({
    templateUrl: 'flex.html',
    controllerAs: 'flex',
    bindToController: true,
    transclude:true,
    scope: {
        row: '=',
        wrap: '=',
        gap: '='
    },
    controller: function ($element, $timeout) {

        var flexClass = {
            "flex-row": this.row || false,
            "flex-wrap": this.wrap || false,
            "flex-gap": this.gap || false
        };

        var init = () => {
        };

        init();

        _.extend(this, {
            getFlexClass: () => flexClass
        });
    }
}));

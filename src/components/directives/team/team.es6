app.directive('teamItem', () => ({
    templateUrl: 'team.html',
    controllerAs: 'team',
    bindToController: true,
    scope: {},
    controller($timeout, State) {

        var getTeam = () => State.getCustomData().team;

        var init = () => {
        };

        init();

        _.extend(this, {
            getTeam

        });
    }
}));

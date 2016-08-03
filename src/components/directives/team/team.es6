app.directive('teamItem', () => ({
    templateUrl: 'team.html',
    controllerAs: 'team',
    bindToController: true,
    scope: {},
    controller($timeout, State, $state) {

        var getTeam = () => State.getCustomData().team;

        var goAuthor = (member) => {
            if (member.author) $state.go('author', {author_id:member.author.ID, authorSlug:member.author.user_nicename});
        };

        var init = () => {
        };

        init();

        _.extend(this, {
            getTeam,
            goAuthor

        });
    }
}));

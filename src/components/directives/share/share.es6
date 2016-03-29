'use strict';

app.directive('share', ($timeout) => {
    return {
        templateUrl: 'share.html',
        scope: {
            id:'=',
            title:'=theTitle'

        },

        link(scope, element, attrs) {

            console.log('sc',scope.summary);
            console.log('sc',scope);
            console.log('sc',attrs);

            var random = _.random(0, 500);

            var getReverseClass = () => {
                return scope.reverse ? 'reverse' : '';
            };

            var getRandom = () => {
                return random;
            };

            var init = () => {
                $timeout(() => scope.ready = true, _.random(500));
                $timeout(() => scope.ready2 = true, _.random(500));
            };

            init();

            scope = _.assign(scope, {
                getReverseClass : getReverseClass,
                getRandom : getRandom

            });
        }
    }
});

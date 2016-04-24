'use strict';

app.directive('loadingItem', (Loading) => ({
    templateUrl: 'loading-item.html',
    scope: {},
    link(scope, element, attrs) {

        var init = () => {

        };

        init();

        _.extend(scope, {
            getActive:Loading.getActive,
            setActive:Loading.setActive,
            randMsg:Loading.randMsg,
            getMessage:Loading.getMessage
        });
    }
}));

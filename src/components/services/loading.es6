'use strict';

app.service('Loading', function ($timeout, $rootScope) {

    var active = false, currentMessage = 0;

    var messages = [
        'Spinning up the hamster...',
        'Shovelling coal into the server...'
        //'Please wait and enjoy the elevator music...',
        //'Loading humorous message, please wait...'
    ];

    var randMsg = () => {
        currentMessage = _.random(0, messages.length - 1);
    };

    var setActive = (flag) => {
        active = (flag == undefined) ? !active : flag;
        if (active) randMsg();
    };

    var init = () => {
        randMsg();
    };

    init();


    var pub = {
        getActive: () => active,
        setActive,
        randMsg,
        getMessage: () => messages[currentMessage]
    };

    _.extend($rootScope, pub);
    _.extend(this, pub);
});
app.service('Search', ($timeout) => {
    var visible = false;

    var show = () => {
        visible = true;
        $timeout(() => $('.search-box input').focus(), 100);
    };

    var init = () => {};

    init();

    return {
        isVisible: () => visible,
        hide: () => visible = false,
        show
    }
});


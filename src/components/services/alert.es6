app.service('Alert', () => {
    var visible = false, content = "";

    var show = (text) => {
        //console.log('showing');
        visible = true;
        content = text;
    };

    var init = () => {};

    init();

    return {
        isVisible: () => visible,
        hide: () => visible = false,
        show,
        getContent: () => content
    }
});



var JSDS = (function () {





    var JSDS =
    {
        Stack: function () { return new JSStack; },
        Queue: function () { return new JSQueue; },
        List: function () { return new JSList; },
        Tree: function () { return new JSTree; },
    };

    return JSDS; // library definitions
})();
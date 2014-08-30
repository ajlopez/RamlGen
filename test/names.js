
var names = require('../source/ramlgen/libs/names');

exports['get name'] = function (test) {
    test.equal(names.getName('song'), 'song');
    test.equal(names.getName('songs'), 'song');
    test.equal(names.getName('/song'), 'song');
    test.equal(names.getName('/songs'), 'song');
}


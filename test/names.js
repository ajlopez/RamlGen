
var names = require('../source/ramlgen/libs/names');

exports['get name'] = function (test) {
    test.equal(names.getName('song'), 'song');
    test.equal(names.getName('songs'), 'song');
    test.equal(names.getName('/song'), 'song');
    test.equal(names.getName('/songs'), 'song');
    test.equal(names.getName('/cities'), 'city');
}

exports['get set name'] = function (test) {
    test.equal(names.getSetName('song'), 'songs');
    test.equal(names.getSetName('songs'), 'songs');
    test.equal(names.getSetName('/song'), 'songs');
    test.equal(names.getSetName('/songs'), 'songs');
    test.equal(names.getSetName('/city'), 'cities');
}

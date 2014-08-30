
var parser = require('raml-parser');
var path = require('path');

exports['load simple model from file'] = function (test) {
    test.async();
    
    var filename = path.join(__dirname, 'simple.raml');
    var pos = filename.indexOf(':');

    if (pos > 0)
        filename = filename.substring(pos + 1);
    
    parser.loadFile(filename)
        .then(function (data) {
            test.done();
        }, function (err) {
            console.log(err);
        });
}

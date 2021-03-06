
var parser = require('raml-parser');
var path = require('path');
var resources = require('../source/ramlgen/libs/resources');

exports['load simple model from file'] = function (test) {
    test.async();

    loadRamlFile(path.join(__dirname, 'simple.raml'), function (err, raml) {
        if (err)
            console.log(err);
        
        try {
            test.ok(!err);
            test.ok(raml);
            
            resources.complete(raml);
            
            test.ok(raml.resources);
            test.ok(raml.resources.length);
            test.equal(raml.resources.length, 3);
            
            var resource = raml.resources[0];
            
            test.ok(resource.entity);
            test.equal(resource.entity.name, 'song');
            test.equal(resource.entity.setname, 'songs');
            test.equal(resource.entity.title, 'Song');
            test.equal(resource.entity.settitle, 'Songs');
            
            test.ok(resource.methods);
            test.ok(resource.methods.length);
            test.equal(resource.methods.length, 2);
            
            var method = resource.methods[0];
            
            test.ok(method.fn);
            test.ok(method.fn.name, 'getSongs');
            
            var method = resource.methods[1];
            
            test.ok(method.fn);
            test.ok(method.fn.name, 'postSong');
            
            test.ok(resource.resources);
            test.ok(resource.resources.length);
            test.ok(resource.resources[0].entity);
            
            test.done();
        }
        catch (err) {
            if (err.stack)
                console.log(err.stack);
            else
                console.log(err);
            throw err;
        }
    });
}

function loadRamlFile(filename, cb) {
    var pos = filename.indexOf(':');

    if (pos > 0)
        filename = filename.substring(pos + 1);
    
    parser.loadFile(filename)
        .then(function (data) {
            cb(null, data);
        }, function (err) {
            cb(err, null);
        });
}

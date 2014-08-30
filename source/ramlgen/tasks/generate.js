
var path = require('path');
var parser = require('raml-parser');
var names = require('../libs/names');
var resources = require('../libs/resources');

function generate(model, args, ajgenesis, cb) {
    if (!model.builddir)
        model.builddir = '.';
        
    model.names = names;

    var filename = args[0];
    var pos = filename.indexOf(':');
    if (pos > 0)
        filename = filename.substring(pos + 1);
    
    parser.loadFile(filename)
        .then(function (raml) {
            resources.complete(raml);
            model.raml = raml;
            
            try {
                var builddir = model.builddir;
                var controllersdir = path.join(builddir, 'controllers');
                var routesdir = path.join(builddir, 'routes');

                ajgenesis.createDirectory(controllersdir);
                ajgenesis.createDirectory(routesdir);

                raml.resources.forEach(function (resource) {
                    model.resource = resource;
                    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'controllers', 'resource.js.tpl'), path.join(controllersdir, resource.relativeUri.substring(1) + '.js'), model);
                    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'resource.js.tpl'), path.join(routesdir, resource.relativeUri.substring(1) + '.js'), model);
                    delete model.resource;
                });            
            }
            catch (err) {
                cb(err, null);
                return;
            }
             
            cb(null, null);
        }, function (err) {
            cb(err, null);
        });        
}

module.exports = function (model, args, ajgenesis, cb) {
    generate(model, args, ajgenesis, cb);
}

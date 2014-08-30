
var path = require('path');
var parser = require('raml-parser');

function generate(model, args, ajgenesis, cb) {
    if (!model.builddir)
        model.builddir = '.';

    var filename = args[0];
    var pos = filename.indexOf(':');
    if (pos > 0)
        filename = filename.substring(pos + 1);
    
    parser.loadFile(filename)
        .then(function (raml) {
            model.raml = raml;
            
            var builddir = model.builddir;
            var routesdir = path.join(builddir, 'routes');
            ajgenesis.createDirectory(routesdir);

            raml.resources.forEach(function (resource) {
                model.resource = resource;
                ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'resource.js.tpl'), path.join(routesdir, resource.relativeUri.substring(1) + '.js'), model);
                delete model.resource;
            });
             
            cb(null, null);
        }, function (err) {
            cb(err, null);
        });        
}

module.exports = function (model, args, ajgenesis, cb) {
    generate(model, args, ajgenesis, cb);
}

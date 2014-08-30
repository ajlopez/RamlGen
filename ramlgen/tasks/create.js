
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, '..', '..', 'source'));
    
    model = model || { };
    
    ajgenesis.copyDirectory(source, dirname, function (err, result) {
        if (err) {
            cb(err, null);
            return;
        }

        var projmodel;

        if (model.project)
            projmodel = model.project;
        else
            model.project = projmodel = { project: { name: dirname, version: '0.0.1'} };
        
        ajgenesis.saveModel(path.join(dirname, 'ramlgen', 'models', 'project.json'), projmodel);
        
        cb(null, null);
    });
}

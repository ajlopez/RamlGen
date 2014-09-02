
var ajgenesis = require('ajgenesis');
var parser = require('raml-parser');
var path = require('path');
var fs = require('fs');

function loadRamlFile(filename) {
    return parser.loadFile(filename);
}

ajgenesis.loadRamlFile = loadRamlFile;

function loadModel() {
    return ajgenesis.loadModel('./ramlgen/models');
}

function doProcess(model, args, cb) {
    var arg = args[0];
    
    var filename = path.join('.', 'ramlgen', 'tasks', arg + '.js');

    if (fs.existsSync(filename)) {
        var gmodule = require(path.resolve(filename));
        gmodule(model, args.slice(1), ajgenesis, cb);
        return;
    }
    
    var filename = path.join(__dirname, '..', 'ramlgen', 'tasks', arg + '.js');

    if (fs.existsSync(filename)) {
        var gmodule = require(path.resolve(filename));
        gmodule(model, args.slice(1), ajgenesis, cb);
        return;
    }
    
    cb("Unknown task '" + arg + "'", null);
}

module.exports = {
    loadModel: loadModel,
    loadRamlFile: loadRamlFile,
    process: doProcess,
    ajgenesis: ajgenesis
}


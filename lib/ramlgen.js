
var ajgenesis = require('ajgenesis');
var path = require('path');
var fs = require('fs');

function loadModel() {
    return ajgenesis.loadModel('./ramlgen/models');
}

function doProcess(model, args, cb) {
    var arg = args[0];
    var filename = path.join(__dirname, '..', 'ramlgen', 'tasks', arg + '.js');

    if (fs.existsSync(filename)) {
        var gmodule = require(path.resolve(filename));
        gmodule(model, args, ajgenesis, cb);
        return;
    }
    
    cb("Unknown task '" + arg + "'", null);
}

module.exports = {
    loadModel: loadModel,
    process: doProcess
}


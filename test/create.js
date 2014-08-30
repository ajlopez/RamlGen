
var createtask = require('../ramlgen/tasks/create'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['create application'] = function (test) {
    test.async();
    
    var dirname = path.join('test', 'build');
    
    createtask(null, [dirname], ajgenesis, function (err, result) {
        test.equal(err, null);
        
        test.ok(fs.existsSync(dirname));
/*        
        test.ok(fs.existsSync(path.join(dirname, 'app.js')));
        test.ok(fs.existsSync(path.join(dirname, 'package.json')));
        
        test.ok(fs.existsSync(path.join(dirname, 'bin')));
        test.ok(fs.existsSync(path.join(dirname, 'bin', 'www')));
        
        test.ok(fs.existsSync(path.join(dirname, 'views')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'index.ejs')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'header.ejs')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'headerjumbo.ejs')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'footer.ejs')));
        
        test.ok(fs.existsSync(path.join(dirname, 'public')));
        test.ok(fs.existsSync(path.join(dirname, 'controllers')));
        test.ok(fs.existsSync(path.join(dirname, 'routes')));
        test.ok(fs.existsSync(path.join(dirname, 'libs')));
        test.ok(fs.existsSync(path.join(dirname, 'libs', 'mongodb.js')));
*/      
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'templates')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'tasks')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'libs')));        
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'models')));
        
        test.done();
    });
};

function removeDirSync(dirname) {
    var filenames = fs.readdirSync(dirname);
    
    filenames.forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (isDirectory(filename))
            removeDirSync(filename);
        else
            removeFileSync(filename);
    });
    
    fs.rmdirSync(dirname);
}

function removeFileSync(filename) {
    fs.unlinkSync(filename);
}

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}


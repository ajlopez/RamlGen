
var generatetask = require('../source/ramlgen/tasks/generate');
var createtask = require('../ramlgen/tasks/create'); 
var path = require('path');
var fs = require('fs');
var ajgenesis = require('ajgenesis');

exports['create application'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    process.chdir('test');
    
    var dirname = 'build';
    
    createtask(null, [dirname], ajgenesis, function (err, result) {
        test.equal(err, null);
        
        test.ok(fs.existsSync(dirname));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'templates')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'tasks')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'libs')));        
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'models')));
        test.ok(fs.existsSync(path.join(dirname, 'ramlgen', 'models', 'project.json')));
        
        process.chdir(cwd);
        
        test.done();
    });
};

exports['generate'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = { };
        
    //if (fs.existsSync('build') && !fs.existsSync(path.join('build', 'node_modules')))
    //    removeDirSync('build');
        
    ajgenesis.createDirectory('build');
    process.chdir('build');
    
    generatetask(model, [path.join(__dirname, 'simple.raml')], ajgenesis, function (err, result) {
        if (err)
            if (err.stack)
                console.log(err.stack);
            else
                console.log(err);
            
        test.equal(err, null);
        test.equal(result, null);
    
        test.ok(fs.existsSync('app.js'));
        test.ok(fs.existsSync('package.json'));
        test.ok(fs.existsSync(path.join('bin', 'www')));
        
        test.ok(fs.existsSync(path.join('routes')));
        test.ok(fs.existsSync(path.join('routes', 'songs.js')));
        test.ok(fs.existsSync(path.join('routes', 'artists.js')));
    
        test.ok(fs.existsSync(path.join('controllers')));
        test.ok(fs.existsSync(path.join('controllers', 'songs.js')));
        test.ok(fs.existsSync(path.join('controllers', 'artists.js')));
        
        process.chdir(cwd);
        
        test.done();
    });    
}

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


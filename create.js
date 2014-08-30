
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, 'source'));
    
    model = model || { };
    
    ajgenesis.copyDirectory(source, dirname, function (err, result) {
        if (err) {
            cb(err, null);
            return;
        }
        
        cb(null, null);
    });
}

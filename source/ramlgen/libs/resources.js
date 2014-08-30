var names = require('./names');

function complete(obj, prefix) {
    if (!prefix)
        prefix = '';

    if (!obj || !obj.resources || !obj.resources.length)
        return;
        
    obj.resources.forEach(function (resource) {
        completeResource(resource, prefix);
    });
}
    
function completeResource(resource, prefix) {
    resource.entity = { };
    
    var name = names.getName(resource.relativeUri);
    
    if (name[0] == '{') {
        name = name.substring(1, name.length - 1);
        resource.entity.name = names.getName(name);
        resource.entity.setname = names.getSetName(name);
        resource.entity.title = 'With' + names.capitalize(name);
        resource.entity.settitle = 'With' + names.capitalize(name);
    }
    else {
        resource.entity.name = names.getName(name);
        resource.entity.setname = names.getSetName(name);
        resource.entity.title = names.capitalize(name);
        resource.entity.settitle = names.capitalize(names.getSetName(name));
    }    
    
    if (resource.methods)
        resource.methods.forEach(function (method) {
            method.fn = { };
            
            if (method.method == 'get' && prefix == '')                
                method.fn.name = method.method + prefix + resource.entity.settitle;
            else
                method.fn.name = method.method + prefix + resource.entity.title;
                
            if (method.responses) {
                if (method.responses['200'] && method.responses['200'].body) {
                    var body = method.responses['200'].body;
                    
                    if (body['application/json'] && body['application/json'].example)
                        method.fn.example = body['application/json'].example;
                }
            }
        });
        
    if (resource.resources)
        resource.resources.forEach(function (subresource) {
            completeResource(subresource, prefix + resource.entity.title);
        });
}

module.exports = {
    complete: complete
};


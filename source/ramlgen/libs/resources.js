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
    
    resource.entity.name = names.getName(resource.relativeUri);
    resource.entity.setname = names.getSetName(resource.relativeUri);
    resource.entity.title = names.capitalize(resource.entity.name);
    resource.entity.settitle = names.capitalize(resource.entity.setname);
    
    if (resource.methods)
        resource.methods.forEach(function (method) {
            method.fn = { };
            
            if (method.method == 'get' && prefix == '')                
                method.fn.name = method.method + prefix + resource.entity.settitle;
            else
                method.fn.name = method.method + prefix + resource.entity.title;
        });
        
    if (resource.resources)
        resource.resources.forEach(function (subresource) {
            completeResource(subresource, prefix + resource.entity.title);
        });
}

module.exports = {
    complete: complete
};


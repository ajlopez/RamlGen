var names = require('./names');

function complete(obj) {
    if (!obj || !obj.resources || !obj.resources.length)
        return;
        
    obj.resources.forEach(function (resource) {
        resource.entity = { };
        
        resource.entity.name = names.getName(resource.relativeUri);
        resource.entity.setname = names.getSetName(resource.relativeUri);
        resource.entity.title = names.capitalize(resource.entity.name);
        resource.entity.settitle = names.capitalize(resource.entity.setname);
    });
}

module.exports = {
    complete: complete
};

<#
actions('', resource);

function actions(prefix, resource) {
    if (resource.description) { #>
// ${resource.description}
<#        
    }
        
    resource.methods.forEach(function (method) {
        if (method.description) { #>
// ${method.description}
<#        
        }
        
        var name = model.names.capitalize(model.names.getName(resource.relativeUri)); #>
function ${method.method}${prefix}${name}(req, res) {
    res.end();
}
<#
        if (resource.resources)
            resource.resources.forEach(function (subresource) {
                actions(prefix + name, subresource);
            });
    });
}
#>

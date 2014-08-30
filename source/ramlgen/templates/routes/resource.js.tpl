
var express = require('express');
var router = express.Router();
var controller = require('../controllers/${resource.entity.setname}');

<#

route('', resource);

function route(prefix, resource) {
    if (resource.description) { #>
// ${resource.description}
<#        
    }

    var uri = resource.relativeUri;        
    if (uri[0] == '/' && uri[1] == '{')
        uri = '/:' + uri.substring(2, uri.length -1);
        
    resource.methods.forEach(function (method) {
        if (method.description) { #>
// ${method.description}
<#        
        }
                
        var url = "'" + prefix + uri + "'"; #>
router.${method.method}(${url}, controller.${method.fn.name});        
<#
    });
    
    if (resource.resources)
        resource.resources.forEach(function (subresource) {
            route(prefix + uri, subresource);
        });
}
#>

module.exports = router;


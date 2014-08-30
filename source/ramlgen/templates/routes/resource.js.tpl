
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
        
    resource.methods.forEach(function (method) {
        if (method.description) { #>
// ${method.description}
<#        
        }
        
        var url = "'" + prefix + resource.relativeUri + "'"; #>
router.${method.method}(${url}, function (req, res) { res.end() });        
<#
    });
    
    if (resource.resources)
        resource.resources.forEach(function (subresource) {
            route(prefix + resource.relativeUri, subresource);
        });
}
#>

module.exports = router;


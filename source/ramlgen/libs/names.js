
function getName(name) {
    if (!name)
        return name;
        
    if (name[0] == '/')
        name = name.substring(1);
        
    var l = name.length;
    
    if (!l)
        return name;
        
    var lastch = name[l - 1];
    
    if (lastch == 's') {
        if (l > 3 && name[l - 3] == 'i' && name[l - 2] == 'e')
            name = name.substring(0, l - 3) + 'y';
        else
            name = name.substring(0, l - 1);
    }
        
    return name;
}

function getSetName(name) {
    name = getName(name);
    
    if (name.length)
        if (name[name.length - 1] == 'y')
            name = name.substring(0, name.length - 1) + 'ies';
        else if (name[name.length - 1] != 's')
            name = name + 's';
            
    return name;
}

function capitalize(name) {
    return name[0].toUpperCase() + name.substring(1);
}

module.exports = {
    getName: getName,
    getSetName: getSetName,
    capitalize: capitalize
}


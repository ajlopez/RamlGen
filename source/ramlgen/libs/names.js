
function getName(name) {
    if (!name)
        return name;
        
    if (name[0] == '/')
        name = name.substring(1);
        
    var l = name.length;
    
    if (!l)
        return name;
        
    var lastch = name[l - 1];
    
    if (lastch == 's')
        name = name.substring(0, l - 1);
        
    return name;
}

module.exports = {
    getName: getName
}


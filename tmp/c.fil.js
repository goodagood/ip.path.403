
var fil = require('../index.js');

var p = console.log;


function readOpt(filePath="/my/opt/filter.js"){
    try{
        var opt = require(filePath);
    }catch(e){
        p(e);
        return [];
    }
    //p(opt, typeof opt);

    if(opt.patterns) return opt.patterns;

    return [];
}

//module.exports.filter = filter;

if(require.main == module){

    p(readOpt());
}

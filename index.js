
const reqIp  = require("request-ip");

var p = console.log;


function filter(opt){

    const msg = opt.msg || "communists are not welcomed.  " +
        "They torture and kill in hundred millions,  " +
        "they keep on cheating and rewriting history books,  " +
        "they have never ever stopped the torturing and killing.";

    var pats = readOpt();
    pats.each(function(pat){
        if(opt.patterns.indexOf(pat) == -1){
            opt.patterns.push(pat);
        }
    });


    const getIdentifier = opt.getId || function(req){

        var ip  = reqIp.getClientIp(req);
        var url = req.originalUrl;

        //p('get identity ', ip, url)

        return ip + url;
    }

    function middleWare(req, res, next){
        var testCandidate = getIdentifier(req);

        if( patternTest(opt.patterns, testCandidate)){
            console.log('403 for ', testCandidate);
            res.status(403).end(msg);
            return;
        }

        next();
    }

    return middleWare;
}


function patternTest(patterns, candidate){
    const len = patterns.length;

    var i = 0;
    for(i=0; i < len; i++){
        //p('to test pattern : ', patterns[i].source, candidate);
        if(patterns[i].test(candidate)){
            //p('pattern tested : ', patterns[i].source, candidate);
            return true;
        }
    }

    return false;
}


function readOpt(filePath="/my/opt/filter.js"){
    try{
        var opt = require(filePath);
    }catch(e){
        p(e);
        return [];
    }

    if(opt.patterns) return opt.patterns;

    return [];
}


module.exports = filter;

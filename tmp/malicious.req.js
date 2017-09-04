const reqIp  = require("request-ip");

var p = console.log;


function filterMalicious(opt){

    const msg = "communists are not welcomed. " +
        "They torture and kill in hundred millions, " +
        "they are hiding the truth, " +
        "and keep the torturing and killing.";

    const getIdentifier = opt.getId || function(req){

        var ip  = reqIp.getClientIp(req);
        var url = req.originalUrl;

        p('get identity ', ip, url)

        return ip + url;
    }

    function middleWare(req, res, next){
        var testCandidate = getIdentifier(req);

        if( patternTest(opt.patterns, testCandidate)){
            console.log('pass pattern test ', req.ip);
            //var body = typeof forbidden === 'function' ? forbidden.call(this, req, res) : forbidden;

            res.status(403).send(msg);
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
        p('to test : ', patterns[i].source, candidate);
        if(patterns[i].test(candidate)){
            p('tested : ', patterns[i].source, candidate);
            return true;
        }
    }

    return false;
}


module.exports = filterMalicious;

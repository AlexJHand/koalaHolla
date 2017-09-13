// Requires
var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function( req, res ) {
    console.log('in koala route');
    pool.connect(function(connectionError, client, done){
        //connectionError - if error occurs connecting to db
        //client- our worker to run the query
        //done - function we will call to release the client
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            //ask the client to run our query
            //params 1. query itself 2. callback
            client.query('SELECT * FROM koalaholla;', function(queryError, resultObj) {
                done();
                //var resultObj
                //queryError - any error that happens in executing the query
                //resultObj - response object from db via pg contains the results set
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    //resultObj.rows contains the result set as an array of objects
                    console.log('resultObj.rows ->', resultObj.rows);
                    res.send(resultObj.rows);
                }

            });
        }

    });
});


module.exports = router;
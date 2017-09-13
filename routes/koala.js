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
router.post('/', function( req, res ){
    console.log('In POST route');
    var koalaIn = req.body;
    console.log(koalaIn);
    pool.connect(function (connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            console.log('In connect else');
            var queryString = 'INSERT INTO koalaholla (name, gender, age, ready_for_transfer, notes)'
            + ' VALUES ($1, $2, $3, $4, $5)';
            var values = [koalaIn.name, koalaIn.gender, koalaIn.age, koalaIn.readyForTransfer, koalaIn.notes];
            console.log(queryString + values);
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if(queryError) {
                    res.sendStatus(500);
                    console.log('fail');
                    console.log(queryError);
                }else {
                    console.log('In success');
                    res.sendStatus(201);
                }
            })
        }
    })
})


module.exports = router;
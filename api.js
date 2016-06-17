// PUBLIC DOMAIN
"use strict";

var MongoClient = require('mongodb').MongoClient;

module.exports = function api( options ) {
  var seneca = this

  seneca.add('role:api,info:hello', hello)
  seneca.add('role:api,info:stockByCategory', stockByCategory)


  seneca.add('init:api',function(args,done){

    // Order is significant here!

    seneca.act('role:web',{use:{
      prefix:'/',
      pin:'role:api,info:*',
      map:{
        hello:true
      }
    }})

    seneca.act('role:web',{use:{
      prefix:'/',
      pin:'role:api,info:*',
      map:{
        stockByCategory:true
      }
    }})
    done()
  })

  function hello( args, done ) {
    done(null,{msg:'hello!'})
  }

  function stockByCategory( args, done ) {
    MongoClient.connect('mongodb://test:test@ds021969.mlab.com:21969/cloud', function(err, db) {
      if (err) {
        throw err;
        //respond( null, { respond: err });
        done(null, {msg: err});
      }
      db.collection('stockByCategory').find().toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        //respond( null, { respond: result });
        done(null, {msg: result});
      });
    });
  }

}

// PUBLIC DOMAIN
var cors = require('cors')
var seneca = require('seneca')()
      .use('./api')
      .ready(function(){
        this.use('entity')
        this.make$('product')
          .make$({id$:0,name:'Apple',price:99,star:0}).save$()
          .make$({id$:1,name:'Orange',price:199,star:0}).save$()
      })

var app = require('express')()
    .use(cors())
    .use( require('body-parser').json() )
    .use( seneca.export('web') )
    .use(cors())    
    .listen(3000)




     


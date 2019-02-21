var http = require('http');

var express = require('express');

var app = express();

var fs = require('fs');

var https = require('https');

var apiai = require('apiai')('e358bd88be034519beebd248850a44bf');

//var edison = require('./controllers/edison');

/* FOR setting IP Add and Port */
var env = require('./env');




/* Setting up HTTPS Certifications */
var options = {  
    key: fs.readFileSync('./secureFiles/key.pem', 'utf8'),  
    cert: fs.readFileSync('./secureFiles/server.crt', 'utf8')  
};  

var server = https.createServer(options,app);

var io = require('socket.io')(server);

/* Socket IO Setup */

io.on('connection', function(socket){


    socket.on('aiTalk', function(talk){ 
       
       /* API FOR AI smart Talk */

    var apiaiReq = apiai.textRequest(talk, {
      sessionId: 'some_unique_session_id'
    });
  
      apiaiReq.on('response', (response) => {
      var aiText = response.result.fulfillment.speech;
      socket.emit('aiTalkResponse', aiText); // Send the result back to the browser!
    });
  
    apiaiReq.on('error', (error) => {
      console.log(error);
    });
  
    apiaiReq.end();
       
    });


    socket.on('kitchen_lights',function(action){
      console.log('k_lights :' +action);
      edison.kitchen_lights_control(parseInt(action));
    })

    socket.on('kitchen_burner',function(action){
      edison.kitchen_burner_control(parseInt(action))
    })

    socket.on('ls_lights',function(action){
      edison.ls_lights_control(parseInt(action))
    })

    socket.on('ls_door',function(action){
      edison.ls_door_control(parseInt(action))
    })

    socket.on('mb_lights',function(action){
      edison.mb_lights_control(parseInt(action))
    })

    socket.on('mb_tv',function(action){
      edison.mb_tv_control(parseInt(action))
    })

    socket.on('mb_pc',function(action){
      edison.mb_pc_control(parseInt(action))
    })

    socket.on('main_door',function(action){
      console.log('main_door :' + action)
      edison.main_gate_control(parseInt(action))
    })


  });       

  
  /* Routing and Requests , setting up static paths */

app.use('/assets',express.static('./assets'));




app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index2.html');
})



server.listen(env.PORT,env.IP_ADD,()=>{
  console.log("Server Listening at https://"+ env.IP_ADD + ":"+env.PORT);
});


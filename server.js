const express = require("express");
var bodyParser= require('body-parser');

const app = express();

app.use(express.static(__dirname+"/public"));
const server= app.listen(8000);
const io = require('socket.io')(server)
var epic=0
io.on('connection',function(socket){

    socket.emit('greeting',{msg:"Greetings, from server Node"});
    socket.on('thankyou',function(data){
    io.emit('curEpic',epic)

    });
    socket.on('addEpic',function(){
        epic++;
        io.emit('curEpic',epic)
    })
    socket.on('restEpic',function(){
        epic=0;
        io.emit('curEpic',epic)
    })

});
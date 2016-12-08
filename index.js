var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('login', function(username){
    socket.screenName = username;
    socket.broadcast.emit('logged_on',  socket.screenName + ' is here!');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', socket.screenName+ ':' + msg);
  });
  socket.on('logout', function(){

 });

 socket.on('disconnect', function(){
    socket.broadcast.emit("logged_off", socket.screenName + " where do you think you're going?");
});


});

http.listen(3000, function(){
  console.log('listening on *:3000. Pour a beer!');
});

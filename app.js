var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var fs = require('fs');
var rock = require('./rock');
var player = require('./player');

var rocks = [];
var players = [];




var app = express();
app.use(express.static('public'));


app.get('/', function(request, response, next){
	fs.readFile('HTMLPage.html', function(err, data){
		response.send(data.toString());
	});
})

var server = http.createServer(app);
server.listen(8888, function(){
	console.log("multigame server has started");
});

var io = socketio.listen(server, { log: false });

io.sockets.on('connection', function(socket){
	console.log("id : " + socket.id);
	var map = new Map();
	if(players[0] === undefined){
		players[0] = new player.Player(100);
		io.sockets.socket(socket.id).emit('player', 0);
		socket.broadcast.emit('anotherPlayer', 0);
		map.set(socket.id, 0);
	}else if(players[1] === undefined){
		players[1] = new player.Player(100);
		io.sockets.socket(socket.id).emit('player', 1);
		socket.broadcast.emit('anotherPlayer', 1);
		map.set(socket.id, 1);
	}else{
		players[2] = new player.Player(100);
		io.sockets.socket(socket.id).emit('player', 2);
		socket.broadcast.emit('anotherPlayer', 2);
		map.set(socket.id, 2);
	}
	
	socket.on('move', function(data){
		console.log(data);
		io.sockets.emit('rendering', data);
	})
	
	socket.on('browserOff', function(data){
		console.log(map.get(socket.id) + " is disconnected");
		players[map.get(socket.id)] = undefined;
	})
})





for(var i=0;i<3;i++){
	rocks[i] = new rock.Rock(io.sockets);
}

rocks[0].start(0, 33);
setTimeout(function(){
	rocks[1].start(1, 26)
}, 1000);
setTimeout(function(){
	rocks[2].start(2, 55)
}, 1600);
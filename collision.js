function Collision(ioSocket){
	this.ioSocket = ioSocket;
}
Collision.prototype.playerAndRockCollision = function(players, rock){
	for(var i in players){
		if(players[i] === undefined){
			continue;
		}
		for(var j in rock){
			if(players[i]._left+100 >= rock[j]._left && 
			   players[i]._left <= rock[j]._left+100 &&
			   players[i]._top+100 >= rock[j]._top &&
			   players[i]._top <= rock[j]._top+100){
				this.ioSocket.emit('collision', {
					playerCode: i
				})
			}
		}
	}
}

module.exports = Collision;
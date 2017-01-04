function Collision(ioSocket){
	this.ioSocket = ioSocket;
}
Collision.prototype.playerAndRockCollision = function(players, rock){
	console.log("collision check");
	console.log("rock[0]._left : " + rock[0]._left);
	if(players[0] !== undefined){
		console.log("players[0]._left : " + players[0]._left);
	}
	
	for(var i in players){
		if(players[i] === undefined){
			continue;
		}
		for(var j in rock){
			if(players[i]._left+100 >= rock[j]._left && 
			   players[i]._left <= rock[j]._left+100 &&
			   players[i]._top+100 >= rock[j]._top &&
			   players[i]._top <= rock[j]._top+100){
				console.log("p" + i + "와 " + j + "가 충돌!");
				this.ioSocket.emit('collision', {
					playerCode: i
				})
			}else{
				console.log("p" + i + "와 " + j + "가 충돌 안 함!");
			}
		}
	}
}

module.exports = Collision;
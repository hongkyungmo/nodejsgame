function Rock(ioSocket){
	this.ioSocket = ioSocket;
};
var initX = 1300;
var initY = [100, 350, 530];

Rock.prototype.start = function(sequence, speed){
	var _x = initX;
	var _y = initY[sequence];
	var _ioSocket = this.ioSocket;
	var _this = this;
	
	var interval = setInterval(function(){
		_x -= speed;
		if(_x < 0){
			clearInterval(interval);
			_this.start(sequence, speed);
		}
		
		_ioSocket.emit('rock', {
			sequence: sequence,
			x: _x,
			y: _y
		})
	}, 100);
}

module.exports = Rock;
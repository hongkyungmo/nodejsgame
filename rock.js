function Rock(ioSocket){
	this.ioSocket = ioSocket;
	this._left;
	this._top;
	this.start = function(sequence, speed){
		this._left = initX;
		this._top = initY[sequence];
		var _ioSocket = this.ioSocket;
		
		var _this = this;
		
		var interval = setInterval(function(){
			_this._left -= speed;

			if(_this._left < 0){
				clearInterval(interval);
				_this.start(sequence, speed);
			}

			_ioSocket.emit('rock', {
				sequence: sequence,
				x: _this._left,
				y: _this._top
			})
		}, 100);
	}
};
var initX = 1300;
var initY = [100, 350, 530];

module.exports = Rock;
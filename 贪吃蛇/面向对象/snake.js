window.onload=function () {
	
	class TCS{
		constructor(){
			this.sence = this.getid("sence");
			this.she = [{x:0,y:0},
						{x:0,y:1},
						{x:0,y:2}];
			this.fx = "right";
			this.food = {};
			this.t;
		}
		play(){
			//创建场景
			this.createSence();
			//创建蛇
			this.createSnake();
			//创建食物
			this.createFood();
			//蛇动
			this.snakeMove();
			//方向
			this.controlSnake();
		}
		createSence(){
			for (var i = 0; i < 20; i++) {
				for (var j = 0; j < 20; j++) {
					var gezi = document.createElement("div");
					gezi.id = i+"-"+j;
					gezi.classList.add("gezi");
					this.sence.appendChild(gezi);
				}
			}
		}
		createSnake(){
			for(var i in this.she){
				var id = this.she[i].x+"-"+this.she[i].y;
				this.getid(id).classList.add("she");
				this.getid(id).classList.remove("shetou");
			}
			var touid = this.she[this.she.length-1].x+"-"+this.she[this.she.length-1].y;
			this.getid(touid).classList.add("shetou");
			var weiid = this.she[0].x+"-"+this.she[0].y;
			this.getid(weiid).classList.add("shewei");
		}
		createFood(){
			do{
				this.food.x = Math.floor(Math.random()*20)
				this.food.y = Math.floor(Math.random()*20)
			}while(false)
			this.getid(this.food.x+"-"+this.food.y).classList.add("shiwu");
		}
		snakeMove(){
			var that = this;
			this.t = setInterval(function(){
				if (that.fx=="right") {
					var newtouX = that.she[that.she.length-1].x;
					var newtouY = that.she[that.she.length-1].y+1;
				}else if (that.fx=="left") {
					var newtouX = that.she[that.she.length-1].x;
					var newtouY = that.she[that.she.length-1].y-1;
				}else if (that.fx=="up") {
					var newtouX = that.she[that.she.length-1].x-1;
					var newtouY = that.she[that.she.length-1].y;
				}else if (that.fx=="down") {
					var newtouX = that.she[that.she.length-1].x+1;
					var newtouY = that.she[that.she.length-1].y;
				}

				var newtou = {x:newtouX,y:newtouY};
				that.she.push(newtou);

				if (newtouX == that.food.x && newtouY == that.food.y) {
					that.getid(that.food.x+"-"+that.food.y).classList.remove("shiwu");
					that.createFood();
				}else{
					var weiba = that.she.shift();
					that.getid(weiba.x+"-"+weiba.y).classList.remove("she")
					that.getid(weiba.x+"-"+weiba.y).classList.remove("shewei")
				}

				that.createSnake();
			},200)
		}
		controlSnake(){
			var that = this;
			document.onkeydown=function(e){
				if (e.keyCode == 37) {
					if (that.fx != 'right') {
						that.fx = "left";
					}
				}
				if (e.keyCode == 38) {
					if (that.fx != 'down') {
						that.fx = "up";
					}
				}
				if (e.keyCode == 39) {
					if (that.fx != 'left') {
						that.fx = "right";
					}
				}
				if (e.keyCode == 40) {
					if (that.fx != 'up') {
						that.fx = "down";
					}
				}
			}
		}

		getid(id){
			return document.getElementById(id)
		}
	}



	var play = document.getElementById("play");
	play.onclick=function(){
		play.style.display="none";
		var tcs = new TCS();
		tcs.play();
	}

}
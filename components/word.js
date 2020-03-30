class Word {
	constructor(ctx, canvas, word, x, y, alive) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.word = word;
		this.x = x;
		this.y = y;
		this.dx = 0
		this.dy = 2.5;
		this.alive = alive;

		this.wordImg = new Image();
		this.wordImg.src = "./assets/images/morty.png";
	}

	draw() {
		this.ctx.drawImage(this.wordImg,
			8, 744,
			120, 160,
			this.x, this.y,
			60, 80);
	}

	drawDead() {
		this.ctx.drawImage(this.wordImg,
			525, 742,
			88, 88,
			this.x, this.y,
			50, 50);
	}

	drawAttack() {
		this.ctx.drawImage(this.wordImg,
			8, 910,
			120, 160,
			this.x, this.y,
			60, 80);
	}

	drawText() {
		this.ctx.beginPath();
		this.ctx.fillStyle = "black";
		this.ctx.font = 'bold 18px "arial"';
		this.ctx.fillText(this.word, this.x, this.y);
		this.ctx.fill();
		this.ctx.shadowBlur = 3;
		this.ctx.closePath();
	}



	animateMovement() {
		this.x += this.dx;
		this.y += this.dy;

	}

	animateAttack() {

	}

	animateDead() {

	}

}

export default Word;
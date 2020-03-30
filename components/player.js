class Player {
	constructor(ctx, canvas, x, y, health) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.x = x;
		this.y = y;
		this.dx = 2;
		this.dy = 0;
		this.health = health;
		this.wpm;
		this.attack = false;

		this.playerImg = new Image();
		this.playerImg.src = './assets/images/rick.png';
	}

	draw() {
			this.ctx.drawImage(this.playerImg,
				545, 8,
				140, 150,
				this.x, this.y,
				// canvas.width / 2, canvas.height-100,
				70, 75
				);
	}

	animateMovement() {
		this.x += this.dx;
		this.y += this.dy;
	}

	drawWordList(words) {
		let list = document.getElementById("word-list");
		list.innerHTML = "";

		Object.values(words).forEach(word =>
		{
			if (word.y >= 350 && word.alive) {
				if (word.word.length > 0 && list.children.length < 10) {
					list.insertAdjacentHTML("beforeend", `<li>${word.word}</li>`);
				}
			}
		})
	}

}

export default Player;
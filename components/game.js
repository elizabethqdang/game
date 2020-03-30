import Word from './word';
import Player from './player';
import Dictionary from './dictionary';

class Game {
	constructor(main, ctx, canvas, wordList, input, scoreInput, menuToggle, superMario) {
		this.main = main;
		this.ctx = ctx;
		this.canvas = canvas;
		this.wordList = wordList;
		this.input = input;
		this.scoreInput = scoreInput;
		this.menu = menu;
		this.menuToggle = menuToggle;
		this.superMario = superMario;
		this.dictionary = new Dictionary();

		this.words = {};
		this.wordCount = 0;
		this.counter = 0;
		this.round = 1;
		this.alive = true;
		this.health = true;
		this.inputTimer = 0;
		this.attackTimer;
		this.typeStart = 0;
		this.typeEnd = 0;
		this.then = Date.now();

		this.resetGame = this.resetGame.bind(this);
		this.spawnWords = this.spawnWords.bind(this);
		this.spawnPlayers = this.spawnPlayers.bind(this);
		this.handleWord = this.handleWord.bind(this);
		this.startGame = this.startGame.bind(this);
		this.GsuperMario = this.GsuperMario.bind(this);
		this.menuClick = this.menuClick.bind(this);
		this.render = this.render.bind(this);
	}

	resetGame() {
		this.words = {};
		// this.player.health = 100;
		this.wordCount = 0;
		this.counter = 0;
		this.round = 1;
		this.alive = true;
		this.health = true;
	}

	startTimer(e) {
		if (this.typeStart === 0 && e.target.value != " ") {
			this.typeStart = Date.now();
		}
	}

	spawnPlayers() {
		let y = canvas.height - 100;
		let x = canvas.width / 2;
		this.player = new Player(this.ctx, this.canvas, x, y, this.health);
	}

	spawnWords() {
		let y = 0;
		let x = Math.floor(Math.random() * (this.canvas.width - 40));

		for (let zomb in this.words) {
			if (this.words[zomb].y <= 150) {
				while (y < this.words[zomb].y + 100 && y > this.words[zomb].y) {
					x = Math.floor(Math.random() * (this.canvas.width - 40));
				}
			}
		}

		let randomSpawn = Math.floor(Math.random() * 2.5) + (250 - this.round);
		if (this.counter % randomSpawn < this.round) {
			this.words[`word${this.wordCount}`] = new Word(this.ctx, this.canvas, this.dictionary.randomWord(),
				x, y, this.alive);
			this.wordCount += 1;
		}
	}

	handleWord(e) {
		if (e.keyCode === 32 || e.keyCode === 13) {
			let value = this.input.value.trim();
			for (let zomb in this.words) {
				if (value === this.words[zomb].word) {
					this.attackTimer = this.counter;
					this.player.attack = true;
					this.words[zomb].word = null;
					this.words[zomb].alive = false;
					break;
				}
			}
			this.input.value = "";
			if (this.typeStart > 0) {
				this.typeEnd = Date.now();
				this.inputTimer += (this.typeEnd - this.typeStart) / 1000;
			}
			this.typeStart = 0;
		}
	}

	hideClick(e) { //
		if (menu.className === "modalPanel") {
			menu.className = "hidden";
		}
	}

	menuClick(e) { //
		if (menu.className === "hidden") {
			menu.className = "modalPanel";
			this.main.className = "modal-screen";
		} else {
			menu.className = "hidden";
		}
	}

	startGame(e) {
		if (e.keyCode === 13 || e.button === 0) {
			// this.canvas.removeEventListener('click', this.startGame);
			// this.main.removeEventListener('keydown', this.startGame);
			this.resetGame();
			clearInterval(window.startInterval);
			clearInterval(window.overInterval);
			requestAnimationFrame(this.render)
			this.input.disabled = false;
			this.input.style.display = "block";
			this.input.focus();
			this.hideClick(); //
			this.menu.addEventListener('click', this.menuClick()); //
			this.main.style.backgroundImage = "url('./assets/images/rickandmorty.jpg')";

		}
	}

	GsuperMario(e) {
		if (e.keyCode === 13 || e.button === 0) {
			// this.canvas.removeEventListener('click', this.startGame);
			// this.main.removeEventListener('keydown', this.startGame);
			this.resetGame();
			clearInterval(window.startInterval);
			clearInterval(window.overInterval);
			requestAnimationFrame(this.render)
			this.input.disabled = false;
			this.input.style.display = "block";
			this.input.focus();
			this.main.style.backgroundImage = "url('./assets/images/supermario.jpg')";
			this.superMario.className = "selected";
			this.hideClick(); //
			this.menu.addEventListener('click', this.menuClick()); // 

		}
	}

	render() {
		let request = requestAnimationFrame(this.render);

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.input.addEventListener('keydown', this.handleWord);
		this.input.addEventListener('input', this.startTimer);

		let fps = 12;
		let interval = 1000 / fps;
		let now = Date.now();
		let delta = now - this.then;

		setInterval(() => {
			this.counter += 10
		}, 5)

		if (this.counter % 10000 === 0) {
			this.round += .5
		}

		this.spawnPlayers();
		this.spawnWords();
		this.player.drawWordList(this.words);

			let { x } = this.player;
			if (this.player.health) {
				if (x < this.canvas) {
					this.player.draw();
					if (delta > interval) {
						this.then = now - (delta % interval);
						this.player.animateMovement();
					}
				} else {
					this.player.draw();
					if (delta > interval) {
						this.then = now - (delta % interval);
						this.player.animateMovement();
					}
				}
			} else {
				this.player.draw();
				if (delta > interval) {
					this.then = now - (delta % interval);
					this.player.animateMovement();
				}
			}

		for (let zomb in this.words) {
			let { y } = this.words[zomb];

			if (this.words[zomb].alive) {
				if (y < this.canvas.height - 100) {
					this.words[zomb].draw();
					this.player.draw();

					if (delta > interval) {
						this.then = now - (delta % interval);
						this.words[zomb].animateMovement();
					}

				} else {
					this.words[zomb].drawAttack();

					if (delta > interval) {
						this.then = now - (delta % interval);
						this.words[zomb].animateAttack();
						this.player.health -= .3;
					}
				}
			} else {
				this.words[zomb].drawDead();
				if (delta > interval) {
					this.then = now - (delta % interval);
					this.words[zomb].animateDead();

				}
			}
		}

		for (let zomb in this.words) {
			if (this.words[zomb].alive) {
				this.words[zomb].drawText()
			}
		}

		if (this.health) {
		// if (this.player.health >= 0) {
			// this.player.draw();
			this.player.animateMovement();
			if (this.counter - this.attackTimer > 4000) {
				this.player.attack = false;
			}
		// } else {
		} else if (this.health <= 0) {
			this.player.health = 0;
			clearInterval(window.intervalId);
			cancelAnimationFrame(request);
			this.gameOver();
		}
	}

}

export default Game;
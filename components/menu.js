class Menu {
	constructor(main, ctx, canvas, superMario, menuToggle, menu) {
		this.main = main;
		this.ctx = ctx;
		this.canvas = canvas;
		this.menu = menu;
		this.superMario = superMario;
		this.menuToggle = menuToggle;

		this.menuclick = this.menuclick.bind(this);
		this.superMario = this.superMario.bind(this);
		this.click = this.click.bind(this);
		this.hideClick = this.hideClick.bind(this);
	}
	menuclick(e) {
		if (menu.className === "hidden") {
			menu.className = "modalPanel";
		} else {
			menu.className = "hidden";
		}
		
	};
	hideClick(e)
	{
		if (menu.className === "modalPanel") {
			menu.className = "hidden";
		}
	};
	click(e) {
		menuOpen.addEventListener('click', menuclick());
	};

	superMario(e) {
		this.main.style.backgroundImage = "assets/images/supermario.jpg";
		this.superMario.className = "selected";
	};

	render() {
		this.menu.addEventListener('click', this.menuclick());
		this.superMario();
	}
}

export default Menu;
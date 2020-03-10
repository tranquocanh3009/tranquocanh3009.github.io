const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
canvas.height = height;

var width = Math.max( body.scrollWidth, body.offsetWidth, 
		                       html.clientWidth, html.scrollWidth, html.offsetWidth );

let particlesArray;

let mouse = {
	x: null,
	y: null,
	radius: canvas.height/80 * canvas.width/80
}

canvas.style.background = "rgb(238, 238, 238)";
var product = document.getElementsByClassName("product");

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	}
);


var light = document.getElementById('light');


var sort = document.getElementsByClassName('sort')[0];

var fill = '#252526';

var p = document.getElementsByTagName('p');

var h3 = document.getElementsByTagName('h3');

var a = document.getElementsByTagName('a');

class Particle {
	constructor (x, y, dirX, dirY, size, color) {
		this.x = x;
		this.y = y;
		this.dirX = dirX;
		this.dirY = dirY;
		this.size = size;
		this.color = color;
	}
	// draw individual particle
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
		ctx.fillStyle = fill;
		ctx.fill();
	}

	// check particle position, check mouse position, move the
	// particle, draw the particle
	update() {
		// check if particle is still within canvas
		if (this.x > canvas.width || this.x < 0) {
			this.dirX = -this.dirX;
		}
		if (this.y > canvas.height || this.y < 0) {
			this.dirY = -this.dirY;
		}
		
		// check collision detection - mouse/particle position
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = dx*dx + dy*dy;

		// Circle Collision
		/*if (distance < this.size + mouse.radius) {
			if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
				this.x += 10;
			}
			if (mouse.x > this.x && this.x > this.size * 10) {
				this.x -= 10;
			}
			if (mouse.y < this.y && this.y > canvas.height - this.size * 10) {
				this.y += 10;
			}
			if (mouse.y > this.y && this.y > this.size * 10) {
				this.y -= 10;
			}
		}*/
		let opacityConnect = Math.random();
		

		// move particle
		this.x += this.dirX;
		this.y += this.dirY;

		this.color = 'rgba(25, 25, 26,' + opacityConnect +')';
		let fontsize = canvas.width/10;
		if (canvas.width > 575) {
			fontsize = 575/10;
		}

		light.onclick = function() {

		
			if (canvas.style.background == "rgb(238, 238, 238)") {
				sort.innerHTML = 'TURN THE LIGHT ON';
				canvas.style.background =  "rgb(25, 25, 26)";
				for (let i = 0; i < product.length; i++) {
					product[i].style["background-image"] = "linear-gradient(180deg, transparent 30%, #252526)";
					sort.style["background-color"] = "rgba(0,0,0,0.3)";
					sort.style["color"] = "cyan";
					fill = "cyan";
					p[i].style.color = 'cyan';
					h3[i].style.color = 'rgb(235,235,235)';
					if (i < 13) {
						a[i].style.color = 'rgb(220,220,220)';
					}
				}
			}
			else {
				canvas.style.background = "rgb(238, 238, 238)";
				for (let i = 0; i < product.length; i++) {
					sort.innerHTML = 'TURN THE LIGHT OFF';
					product[i].style["background-image"] = "linear-gradient(180deg, transparent 30%, #ffffff)";
					sort.style["background-color"] = "rgba(255,255,255,0.5)";
					sort.style["color"] = '#252526';
					fill = '#252526';
					p[i].style.color = '#cc0000';
					h3[i].style.color = '#252526';
					if (i < 13) {
						a[i].style.color = '#252526';
					}
				}
			}
		}
		// draw particle
		this.draw();

	}
}

// create particle array
function init() {
	particlesArray = [];
	var numberOfParticles = canvas.height / 50;
	for (let i = 0; i < numberOfParticles; i++) {
		let size = Math.random() * 1 + 1;
		let x = Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2;
		let y = Math.random() * ((height - size * 2) - (size * 2)) + size * 2;
		let dirX = Math.random() * 1 - 0.5;
		let dirY = Math.random() * 1 - 0.5;
		let color = '0099ff';

		particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
	}
}

// animation loop
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, height);

	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
	}
	connect();
}

// check if particles are close enough to draw line between them
function connect() {
	
}

window.addEventListener('resize', 
	function() {
		body = document.body,
		html = document.documentElement;

		height = Math.max( body.scrollHeight, body.offsetHeight, 
		                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		
		width = Math.max( body.scrollWidth, body.offsetWidth, 
		                       html.clientWidth, html.scrollWidth, html.offsetWidth );
		canvas.width = width;
		canvas.height = height;
		mouse.radius =  canvas.height/80 * canvas.width/80;
		init();
	}
);

window.addEventListener('mouseout', 
	function() {
		mouse.x = undefined;
		mouse.y = undefined;
	}
);



init();

animate();

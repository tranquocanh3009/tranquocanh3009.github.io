const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
	x: null,
	y: null,
	radius: canvas.height/80 * canvas.width/80
}

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	}
);

window.addEventListener('click', 
	function(event) {
		for (let i = 0; i < 3; i++) {
			let circle = 20;
			let size = Math.random() * 1 + 1;
			let x = Math.random() * (2 * circle) + (event.x - circle);
			let y = Math.random() * (2 * circle) + (event.y - circle);
			let dirX = Math.random() * 1;
			let dirY = Math.random() * 1;
			let color = '0099ff';
			particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
		}
	}
);


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
		ctx.fillStyle = '#0099ff';
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
		let opacityConnect = 1;
		if (distance < canvas.width/8 * canvas.height/8) {
			opacityConnect = 1 - distance/(canvas.width/8 * canvas.height/8);
			ctx.strokeStyle = 'rgba(0, 99, 255,' + opacityConnect +')';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		}

		// move particle
		this.x += this.dirX;
		this.y += this.dirY;

		this.color = 'rgba(150, 150, 255,' + opacityConnect +')';
		let fontsize = canvas.width/10;
		if (canvas.width > 575) {
			fontsize = 575/10;
		}
		ctx.font = fontsize + "px Courier";
		ctx.fillStyle = "rgba(100, 100, 255, 0.5)";
		ctx.fillText("Tap the screen", canvas.width/2 - fontsize * 4.16, canvas.height/2 - fontsize/2);

		// draw particle
		this.draw();

	}
}

// create particle array
function init() {
	particlesArray = [];
	var numberOfParticles = (canvas.height * canvas.width) / 20000;
	for (let i = 0; i < numberOfParticles; i++) {
		let size = Math.random() * 1 + 1;
		let x = Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2;
		let y = Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2;
		let dirX = Math.random() * 1;
		let dirY = Math.random() * 1;
		let color = '0099ff';

		particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
	}
}

// animation loop
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
	}
	connect();
}

// check if particles are close enough to draw line between them
function connect() {
	let opacityConnect = 1;
	for (let a = 0; a < particlesArray.length; a++) {
		for (let b = a; b < particlesArray.length; b++) {
			let distance = (particlesArray[a].x - particlesArray[b].x) *
				(particlesArray[a].x - particlesArray[b].x) +
				(particlesArray[a].y - particlesArray[b].y) *
				(particlesArray[a].y - particlesArray[b].y);
			if (distance < canvas.width/8 * canvas.height/8) {
				opacityConnect = 1 - distance/(canvas.width/8 * canvas.height/8);
				ctx.strokeStyle = 'rgba(150, 150, 255,' + opacityConnect +')';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}

window.addEventListener('resize', 
	function() {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
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
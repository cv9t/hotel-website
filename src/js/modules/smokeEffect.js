export default () => {
	const canvasHeight = 200;

	let pCount = 0;

	const pCollection = [];

	const puffs = 1;
	const particlesPerPuff = 100000;
	const img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';

	const smokeImage = new Image();
	smokeImage.src = img;

	for (let i1 = 0; i1 < puffs; i1++) {
		const puffDelay = i1 * 1500;

		for (let i2 = 0; i2 < particlesPerPuff; i2++) {
			addNewParticle(i2 * 50 + puffDelay);
		}
	}

	draw(new Date().getTime(), 3000);

	function addNewParticle(delay) {
		const p = {};
		p.top = canvasHeight;
		p.left = randBetween(-200, 800);

		p.start = new Date().getTime() + delay;
		p.life = 8000;
		p.speedUp = 30;

		p.speedRight = randBetween(0, 20);

		p.rot = randBetween(-1, 1);
		p.red = Math.floor(randBetween(0, 255));
		p.blue = Math.floor(randBetween(0, 255));
		p.green = Math.floor(randBetween(0, 255));

		p.startOpacity = 0.3;
		p.newTop = p.top;
		p.newLeft = p.left;
		p.size = 200;
		p.growth = 10;

		pCollection[pCount] = p;
		pCount++;
	}

	function draw(startT, totalT) {
		let stillAlive = false;

		const c = document.getElementById('myCanvas');
		const ctx = c.getContext('2d');
		ctx.clearRect(0, 0, c.width, c.height);

		for (let i = 0; i < pCount; i++) {
			const p = pCollection[i];

			const td = new Date().getTime() - p.start;
			const frac = td / p.life;

			if (td > 0) {
				if (td <= p.life) {
					stillAlive = true;
				}

				const newTop = p.top - p.speedUp * (td / 1000);
				const newLeft = p.left + p.speedRight * (td / 1000);
				const newOpacity = Math.max(p.startOpacity * (1 - frac), 0);

				const newSize = p.size + p.growth * (td / 1000);
				p.newTop = newTop;
				p.newLeft = newLeft;

				ctx.fillStyle = `rgba(150,150,150,${newOpacity})`;
				ctx.globalAlpha = newOpacity;
				ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
			}
		}

		if (stillAlive) {
			requestAnimationFrame(function () {
				draw(startT, totalT);
			});
		}
	}

	function randBetween(n1, n2) {
		const r = Math.random() * (n2 - n1) + n1;
		return r;
	}
};

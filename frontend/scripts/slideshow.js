const $=document.querySelector.bind(document);

const BACKEND_URL = 'http://localhost:5000';

// Time between image changes in ms
const INTERVAL = 1500;

// Base remote media directory
const BASE = 'Dropbox';

// References to image and video elements
const image = $('img');
const video = $('video');

// 0 = on
// 1 = off
var backlight = 0;

var timeout;


class Slideshow {
	constructor(folder) {
		this.folder = folder;
		this.frame = 0;
	}

	fetchSlides() {
		return fetch(`${BACKEND_URL}/files/${this.folder}`)
			.then(resp => resp.json());
	}

	next() {
		let url = [BASE, this.folder, this.slides[this.frame]].join('/');
		this.frame = this.frame >= this.slides.length - 1 ? 0 : this.frame + 1;

		fetch(url)
			.then(resp => resp.headers.get('Content-Type'))
			.then(type => {
				if (type.startsWith('video')) {
					image.style.display = 'none';
					video.style.display = 'inline';
					video.src = url;
				}
				else if (type.startsWith('image')) {
					video.pause();
					video.style.display = 'none';
					image.style.display = 'block';
					image.src = url;
					timeout = setTimeout(this.run.bind(this), INTERVAL);
				}
				else {
					this.run();
				}
			});
	}

	run() {
		if (this.frame === 0) {
			this.fetchSlides()
				.then(resp => {
					this.slides = resp.data;
					this.next();
				});
		} else {
			this.next();
		}
	}
}


class Switcher {
	constructor() {
		this.frame = 0;
	}

	fetchFolders() {
		return fetch(`${BACKEND_URL}/folders`)
			.then(resp => resp.json());
	}

	next() {
		this.slideshow = new Slideshow(this.folders[this.frame]);
		this.frame = this.frame >= this.folders.length - 1 ? 0 : this.frame + 1;

		// Closure required to retain context
		// (It would otherwise be replaced by the `video` object)
		video.onended = () => {
			this.slideshow.run();
		};

		this.slideshow.run();
	}

	run() {
		if (this.frame === 0) {
			this.fetchFolders()
				.then(resp => {
					this.folders = resp.data;
					this.next();
				});
		} else {
			this.next();
		}
	}
}

function toggleDisplay() {
	backlight ^= 1;
	fetch(`${BACKEND_URL}/backlight/${backlight}`);
}

function shutdown() {
	fetch(`${BACKEND_URL}/shutdown`);
}


let switcher = new Switcher();
switcher.run();

onclick = e => {
	if (e.x > 0.75 * innerWidth && e.y < 0.25 * innerHeight) {
		// top-right corner
		shutdown();
	} else if (e.x < 0.25 * innerWidth && e.y < 0.25 * innerHeight) {
		// top-left corner
		toggleDisplay();
	} else if (e.x < 0.25 * innerWidth && e.y > 0.75 * innerHeight) {
		// bottom-left corner
		window.location.reload();
	} else {
		clearTimeout(timeout);
		switcher.next();
	}
};

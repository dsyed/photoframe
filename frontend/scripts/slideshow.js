const $=document.querySelector.bind(document);

const BACKEND_URL = 'http://localhost:5000';

// Time between image changes in ms
const INTERVAL = 1500;

// Base remote media directory
const BASE = 'remote';

// References to image and video elements
const image = $('img');
const video = $('video');


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
					video.style.display = 'none';
					image.style.display = 'block';
					image.src = url;
					setTimeout(this.next.bind(this), INTERVAL);
				}
				else {
					this.next();
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

let switcher = new Switcher();
switcher.run();

window.onclick = () => {
	switcher.next();
};

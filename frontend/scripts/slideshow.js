const $=document.querySelector.bind(document);

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
		// Example response from backend
		if (this.folder === 'a') {
			return [
				'spider-man.mov',
				'tiger_cub.jpg'
			];
		};

		if (this.folder === 'b') {
			return [
				'puppy.gif',
				'spider-man.mov',
				'star-wars.mov'
			];
		}
	}

	next() {
		if (this.frame === 0) {
			this.slides = this.fetchSlides();
		}

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
}


class Switcher {
	constructor() {
		this.frame = 0;
	}

	fetchFolders() {
		// Example response from backend
		return ['a', 'b'];
	}

	next() {
		if (this.frame === 0) {
			this.folders = this.fetchFolders();
		}

		this.slideshow = new Slideshow(this.folders[this.frame]);
		this.frame = this.frame >= this.folders.length - 1 ? 0 : this.frame + 1;

		// Closure required to retain context
		// (It would otherwise be replaced by the `video` object)
		video.onended = () => {
			this.slideshow.next();
		};

		this.slideshow.next();
	}
}

let switcher = new Switcher();
switcher.next();

window.onclick = () => {
	switcher.next();
};

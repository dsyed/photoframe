const $=document.querySelector.bind(document);

// ms between image changes
const INTERVAL = 1500;

// Base remote media directory
const BASE = 'remote';

// References to image and video elements
const image = $('img');
const video = $('video');


// Example response from backend
let media = {
    'a': [
        'spider-man.mov',
        'tiger_cub.jpg'
    ],
    'b': [
        'puppy.gif',
        'spider-man.mov',
        'star-wars.mov'
    ]
};

var i = 0;
var folder = 'b';

function switchMedia() {
    let slideshow = media[folder];
    let url = [BASE, folder, slideshow[i]].join('/');
    i = i >= slideshow.length - 1 ? 0 : i + 1;

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
                setTimeout(switchMedia, INTERVAL);
            }
            else {
                switchMedia();
            }
        });
}

switchMedia();

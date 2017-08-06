// ms between image changes
var interval = 1500;

const $=document.querySelector.bind(document);

let images = [
    'images/IMG_0670.JPG',
    'images/puppy.gif',
    'images/tiger_cub.jpg'
];

let videos = [
    'videos/spider-man.mov',
    'videos/star-wars.mov'
];

var i = 0;

function switchImage() {
    let img = $('img');
    img.src = images[i++];
    i = i >= images.length ? 0 : i;
}

function switchVideo() {
    let video = $('video');
    i = i >= videos.length - 1 ? 0 : i + 1;
    video.src = videos[i];
}

// setInterval(switchImage, interval);
let video = $('video');
video.onended = switchVideo;

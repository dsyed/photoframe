// ms between image changes
var interval = 1500;

const $=document.querySelector.bind(document);

var img = $('img');
var video = $('video');

// let images = [
//     'images/IMG_0670.JPG',
//     'images/puppy.gif',
//     'images/tiger_cub.jpg'
// ];

let videos = [
    'videos/spider-man.mov',
    'videos/star-wars.mov'
];

let media = {
    'a': [
        'spider-man.mov',
        'tiger-cub.jpg'
    ],
    'b': [
        'puppy.gif',
        'spider-man.mov',
        'star-wars.mov'
    ]
};

var i = 0;

function switchMedia() {
    let url = videos[i];
    i = i >= videos.length - 1 ? 0 : i + 1;

    fetch(url)
        .then(resp => resp.headers.get('Content-Type'))
        .then(type => video.src = url);
}

// function switchImage() {
//     img.src = images[i++];
//     i = i >= images.length ? 0 : i;
// }

// function switchVideo() {
//     i = i >= videos.length - 1 ? 0 : i + 1;
//     video.src = videos[i];
// }

// setInterval(switchImage, interval);
switchMedia();

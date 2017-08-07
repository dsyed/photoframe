const $=document.querySelector.bind(document);

// ms between image changes
const INTERVAL = 1500;


var image = $('img');
var video = $('video');

// let images = [
//     'images/IMG_0670.JPG',
//     'images/puppy.gif',
//     'images/tiger_cub.jpg'
// ];

// let videos = [
//     'videos/spider-man.mov',
//     'videos/star-wars.mov'
// ];

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

function switchMedia() {
    let folder = 'b';
    let slideshow = media[folder];
    let url = 'remote' + '/' + folder + '/' + slideshow[i];
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

const $=document.querySelector.bind(document);

let images = [
    'images/IMG_0670.JPG',
    'images/puppy.gif',
    'images/tiger_cub.jpg'
];

var i = 0;

function switchImage() {
    let img = $('img');
    img.src = images[i++];
    i = i === images.length ? 0 : i;
}

setInterval(switchImage, 1500);

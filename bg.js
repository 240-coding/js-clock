const body = document.querySelector("body");

function paintImage() {
    const image = new Image();
    image.src = "https://source.unsplash.com/1920x1080/?landscape,nature";
    image.classList.add("bgImage");
    body.appendChild(image);
}
function init() {
    paintImage();
}

init();
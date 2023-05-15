const images = [
  "/bild/American_Gothic.jpg",
  "/bild/Campbell's Soup Cans.jpg",
  "/bild/Mona Lisa.jpg",
  "/bild/Drowning Girl.jpg",
  "/bild/Nighthawks.jpg",
  "/bild/PicassoGuernica.jpg",
  "/bild/The Garden of Earthly Delights.jpg",
  "/bild/The Great Wave off Kanagawa.jpg",
  "/bild/The Scream.jpg",
  "/bild/the-persistence-of-memory.jpg",
  "/bild/VanGogh-starry_night_ballance.jpg",
  "/bild/kiss.jpg"
];

let currentImage = 0;

function cycleImages() {
  const gallery = document.querySelector('#gallery-sidebar-1');
  const imgElement = gallery.querySelector('img');
  const nextImage = (currentImage + 1) % images.length;
  imgElement.src = images[nextImage];
  currentImage = nextImage;
}



setInterval(cycleImages, 3000);



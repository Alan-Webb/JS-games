// NAVBAR
// JS representation from DOM
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
//hamburger animation
hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
});

// IMAGE CAROUSEL
//JS representation form DOM
const imgs = document.getElementById("imgs");
const leftBtn = document.getElementById("prevBtn");
const rightBtn = document.getElementById("nextBtn");
const img = document.querySelectorAll("#imgs img");

let idx = 0;

let interval = setInterval(run, 3000);

function run() {
	idx++;
	changeImage();
}

function changeImage() {
	if (idx > img.length - 1) {
		idx = 0;
	} else if (idx < 0) {
		idx = img.length - 1;
	}
	imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function resetInterval() {
	clearInterval(interval);
	interval = setInterval(run, 3000);
}

nextBtn.addEventListener("click", () => {
	idx++;
	changeImage();
	resetInterval();
});

prevBtn.addEventListener("click", () => {
	idx--;
	changeImage();
	resetInterval();
});

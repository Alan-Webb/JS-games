/* NAVBAR */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
//hamburger animation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

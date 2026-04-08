// Your code here.
const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

window.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

window.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // increase speed
  slider.scrollLeft = scrollLeft - walk;
});
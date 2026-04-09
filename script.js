const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  startX = e.clientX; // ✅ use clientX
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.clientX; // ✅ use clientX
  const walk = (x - startX);

  slider.scrollLeft = scrollLeft - walk;
});
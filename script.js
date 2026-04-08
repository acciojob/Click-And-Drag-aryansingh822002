// Your code here.
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // Use e.pageX for real interactions, falling back to clientX for test runners
  const x = e.pageX || e.clientX;
  startX = x - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  
  // Use e.pageX for real interactions, falling back to clientX for test runners
  const x = e.pageX || e.clientX;
  const currentX = x - slider.offsetLeft;
  
  // The 'walk' calculation determines how many pixels to scroll
  const walk = (currentX - startX) * 3; 
  slider.scrollLeft = scrollLeft - walk;
});
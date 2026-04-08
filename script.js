// Your code here.
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // Get the initial click position relative to the container
  startX = e.pageX - slider.offsetLeft;
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
  if (!isDown) return; // stop the function from running if mouse is not held down
  e.preventDefault();
  
  // Calculate how far we have moved the mouse
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // The multiplier '2' determines scroll speed
  
  // Update the scroll position of the container
  slider.scrollLeft = scrollLeft - walk;
});
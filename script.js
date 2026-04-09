const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // Get the initial click position relative to the container
  startX = e.pageX - slider.offsetLeft;
  // Record the initial scroll position
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
  if (!isDown) return; // stop the fn from running if mouse is not down
  e.preventDefault();
  
  // Calculate current mouse position
  const x = e.pageX - slider.offsetLeft;
  // Calculate distance moved (multiplied by a factor for "natural" feel)
  const walk = (x - startX) * 3; 
  
  // Update scroll position
  slider.scrollLeft = scrollLeft - walk;
});
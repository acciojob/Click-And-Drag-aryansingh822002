const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Calculate the initial click point
  // e.pageX is the mouse position, slider.offsetLeft is the container's start
  startX = e.pageX - slider.offsetLeft;
  
  // Record the scroll position at the moment of click
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
  if (!isDown) return; // Stop the function from running if mouse is not held down
  
  e.preventDefault(); // Prevent text selection or accidental drags
  
  // Current mouse position
  const x = e.pageX - slider.offsetLeft;
  
  // Calculate the distance moved
  // The multiplier (3) makes the scroll feel more responsive ("walk" speed)
  const walk = (x - startX) * 3; 
  
  // Update the scroll position of the container
  slider.scrollLeft = scrollLeft - walk;
});
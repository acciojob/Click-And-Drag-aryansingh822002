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
  if (!isDown) return; // Stop the function from running if mouse is not clicked
  
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  
  // Calculate how far we have moved from the start point
  // Multiply by a scalar (e.g., 3) for faster/smoother scrolling
  const walk = (x - startX) * 2; 
  
  // Update the container's scroll position
  slider.scrollLeft = scrollLeft - walk;
});
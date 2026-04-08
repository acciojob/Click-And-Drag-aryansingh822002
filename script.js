// Your code here.
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // e.pageX is the mouse position, slider.offsetLeft is the container's edge
  startX = e.pageX - slider.offsetLeft;
  
  // Record the current scroll position when we click down
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
  // If we aren't clicking down, stop the function
  if (!isDown) return; 
  
  // Prevent default behavior (like selecting text)
  e.preventDefault(); 
  
  // Calculate current mouse position
  const x = e.pageX - slider.offsetLeft;
  
  // Calculate how far we've moved from the startX
  // Multiplied by a factor (e.g., 3) to make the drag feel faster/smoother
  const walk = (x - startX) * 3; 
  
  // Update the container's scroll position
  slider.scrollLeft = scrollLeft - walk;
});
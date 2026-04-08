// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offset = { x: 0, y: 0 };

// Initialize items for absolute positioning within the container
items.forEach(item => {
  item.style.cursor = 'grab';
  // We use mousedown on each item to select it
  item.addEventListener('mousedown', (e) => {
    activeItem = item;
    activeItem.style.cursor = 'grabbing';
    activeItem.style.zIndex = '1000'; // Bring to front
    
    // Calculate the distance between the mouse and the top-left of the item
    const rect = activeItem.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Store the offset so the mouse stays at the same spot on the cube
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;
    
    container.classList.add('active');
  });
});

// Dragging logic attached to the window to ensure smooth movement even if mouse leaves item
window.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  e.preventDefault();

  const containerRect = container.getBoundingClientRect();
  
  // Calculate potential new positions relative to the container
  let newX = e.clientX - containerRect.left - offset.x;
  let newY = e.clientY - containerRect.top - offset.y;

  // Boundary Constraints
  const maxX = containerRect.width - activeItem.offsetWidth;
  const maxY = containerRect.height - activeItem.offsetHeight;

  // Clamp values inside [0, max]
  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  // Apply styles
  activeItem.style.position = 'absolute';
  activeItem.style.left = `${newX}px`;
  activeItem.style.top = `${newY}px`;
  // Reset margins/transforms that might interfere with absolute positioning
  activeItem.style.margin = '0';
});

// Drop logic
window.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.cursor = 'grab';
    activeItem = null;
    container.classList.remove('active');
  }
});
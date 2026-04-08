// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let shiftX = 0;
let shiftY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    activeItem = item;

    // Calculate the distance from the mouse click to the top-left corner of the item
    // This prevents the item from "jumping" to the cursor point
    const rect = activeItem.getBoundingClientRect();
    shiftX = e.clientX - rect.left;
    shiftY = e.clientY - rect.top;

    // Preparation for moving: set absolute positioning and high z-index
    activeItem.style.position = 'absolute';
    activeItem.style.zIndex = 1000;
    activeItem.style.margin = '0'; // Reset margins to ensure accurate positioning
    
    // Add active class for styling (defined in your CSS)
    container.classList.add('active');
    
    // Move it once to the current position to avoid a jump
    moveAt(e.pageX, e.pageY);
  });
});

function moveAt(pageX, pageY) {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();
  
  // Calculate potential new position relative to the container
  let newLeft = pageX - containerRect.left - window.scrollX - shiftX;
  let newTop = pageY - containerRect.top - window.scrollY - shiftY;

  // Boundary Constraints: Snap back inside if dragged outside
  const maxLeft = containerRect.width - activeItem.offsetWidth;
  const maxTop = containerRect.height - activeItem.offsetHeight;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newTop > maxTop) newTop = maxTop;

  activeItem.style.left = newLeft + 'px';
  activeItem.style.top = newTop + 'px';
}

function onMouseMove(e) {
  if (activeItem) {
    moveAt(e.pageX, e.pageY);
  }
}

// Attach listeners to window so movement continues even if mouse leaves the item
window.addEventListener('mousemove', onMouseMove);

window.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem = null;
    container.classList.remove('active');
  }
});

// Prevent default browser drag-and-drop behavior (which conflicts with our code)
items.forEach(item => {
  item.ondragstart = function() {
    return false;
  };
});
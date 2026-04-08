// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let isDragging = false;
let currentItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;

    // Bring selected item on top
    item.style.zIndex = 1000;

    const rect = item.getBoundingClientRect();

    // Calculate mouse offset inside the cube
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Make position absolute so we can move it
    item.style.position = 'absolute';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = currentItem.getBoundingClientRect();

  // Calculate new position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - itemRect.width));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - itemRect.height));

  // Apply position
  currentItem.style.left = newLeft + 'px';
  currentItem.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
  if (currentItem) {
    currentItem.style.zIndex = 1;
  }
  isDragging = false;
  currentItem = null;
});
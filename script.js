// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let isDragging = false;
let currentItem = null;
let offsetX = 0;
let offsetY = 0;

// Make container relative so absolute children stay inside
container.style.position = "relative";

items.forEach(item => {
  item.style.position = "absolute";

  // Set initial grid positions
  const rect = item.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  item.style.left = (rect.left - parentRect.left + container.scrollLeft) + "px";
  item.style.top = (rect.top - parentRect.top) + "px";

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;

    const itemRect = item.getBoundingClientRect();

    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    item.style.zIndex = 1000;
    container.classList.add('active');
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentItem) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX + container.scrollLeft;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  const maxX = container.scrollWidth - currentItem.offsetWidth;
  const maxY = container.offsetHeight - currentItem.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  currentItem.style.left = x + "px";
  currentItem.style.top = y + "px";
});

document.addEventListener('mouseup', () => {
  if (currentItem) {
    currentItem.style.zIndex = 1;
  }
  isDragging = false;
  currentItem = null;
  container.classList.remove('active');
});
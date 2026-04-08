// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let isDragging = false;
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

// Make container a boundary reference
const containerRect = () => container.getBoundingClientRect();

cubes.forEach(cube => {

  cube.style.position = "absolute"; // required for movement

  // initial placement (grid-like)
  const rect = cube.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  cube.style.left = rect.left - parentRect.left + "px";
  cube.style.top = rect.top - parentRect.top + "px";

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentCube = cube;

    const rect = cube.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.zIndex = 1000;
  });
});

// Mouse move
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentCube) return;

  const parent = containerRect();

  let x = e.clientX - parent.left - offsetX;
  let y = e.clientY - parent.top - offsetY;

  // Boundary constraints
  const maxX = parent.width - currentCube.offsetWidth;
  const maxY = parent.height - currentCube.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  currentCube.style.left = x + "px";
  currentCube.style.top = y + "px";
});

// Mouse up
document.addEventListener('mouseup', () => {
  if (currentCube) {
    currentCube.style.zIndex = 1;
  }
  isDragging = false;
  currentCube = null;
});
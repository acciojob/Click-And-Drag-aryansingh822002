// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('mousedown', startDragging);
});

function startDragging(e) {
  const item = e.target;
  
  // Calculate the initial offset between the mouse and the top-left of the item
  // This prevents the item from "snapping" its top-left corner to the cursor
  let shiftX = e.clientX - item.getBoundingClientRect().left;
  let shiftY = e.clientY - item.getBoundingClientRect().top;

  // Prepare the item for moving
  item.style.position = 'absolute';
  item.style.zIndex = 1000; // Bring to front
  document.body.append(item); // Move to body to avoid parent overflow issues during drag

  function moveAt(pageX, pageY) {
    let newX = pageX - shiftX;
    let newY = pageY - shiftY;

    // Boundary Logic
    const containerRect = container.getBoundingClientRect();

    // Horizontal bounds
    if (newX < containerRect.left) newX = containerRect.left;
    if (newX + item.offsetWidth > containerRect.right) {
      newX = containerRect.right - item.offsetWidth;
    }

    // Vertical bounds
    if (newY < containerRect.top) newY = containerRect.top;
    if (newY + item.offsetHeight > containerRect.bottom) {
      newY = containerRect.bottom - item.offsetHeight;
    }

    item.style.left = newX + 'px';
    item.style.top = newY + 'px';
  }

  // Move the item under the pointer initially
  moveAt(e.pageX, e.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // Listen for mousemove to drag the item
  document.addEventListener('mousemove', onMouseMove);

  // Drop the item on mouseup
  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };

  // Prevent default browser drag-and-drop behavior (like ghost images)
  item.ondragstart = function() {
    return false;
  };
}
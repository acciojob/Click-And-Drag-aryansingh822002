// Your code goes here

(function() {
  const container = document.querySelector('.items');
  let selectedItem = null;
  let isDragging = false;
  let startX, startY;
  let initialScrollLeft;
  
  // Handle mouse down
  function onMouseDown(e) {
    const item = e.target.closest('.item');
    if (!item) return;
    
    e.preventDefault();
    
    selectedItem = item;
    isDragging = true;
    
    // Store start positions
    startX = e.pageX;
    startY = e.pageY;
    initialScrollLeft = container.scrollLeft;
    
    // Add active class
    container.classList.add('active');
    
    // Style for dragging
    selectedItem.style.cursor = 'grabbing';
    selectedItem.style.opacity = '0.8';
    selectedItem.style.zIndex = '1000';
    selectedItem.style.position = 'relative';
  }
  
  // Handle mouse move
  function onMouseMove(e) {
    if (!isDragging || !selectedItem) return;
    
    e.preventDefault();
    
    // Calculate drag distance
    const dx = e.pageX - startX;
    
    // Scroll the container
    container.scrollLeft = initialScrollLeft - dx;
  }
  
  // Handle mouse up
  function onMouseUp(e) {
    if (!isDragging || !selectedItem) return;
    
    // Reset styles
    selectedItem.style.cursor = '';
    selectedItem.style.opacity = '';
    selectedItem.style.zIndex = '';
    selectedItem.style.position = '';
    
    // Remove active class
    container.classList.remove('active');
    
    // Reset drag state
    isDragging = false;
    selectedItem = null;
  }
  
  // Add event listeners
  container.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  
  // Prevent default drag behavior
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => e.preventDefault());
  });
})();
// Your code goes here

(function() {
  const container = document.querySelector('.items');
  const items = document.querySelectorAll('.item');
  
  let selectedItem = null;
  let isDragging = false;
  let startX, startY;
  let originalLeft, originalTop;
  let offsetX, offsetY;
  let scrollLeft, scrollTop;
  
  // Store original positions and make items absolutely positioned
  function initializePositions() {
    const containerRect = container.getBoundingClientRect();
    
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      
      // Store original position
      item.style.position = 'absolute';
      item.style.left = (rect.left - containerRect.left + container.scrollLeft) + 'px';
      item.style.top = (rect.top - containerRect.top + container.scrollTop) + 'px';
      item.style.width = rect.width + 'px';
      item.style.height = rect.height + 'px';
      item.style.margin = '0';
      
      // Store original transform
      const transform = window.getComputedStyle(item).transform;
      if (transform !== 'none') {
        item.style.transform = transform;
      }
    });
  }
  
  // Get container boundaries
  function getBoundaries(item) {
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    return {
      minX: 0,
      maxX: containerRect.width - itemRect.width,
      minY: 0,
      maxY: containerRect.height - itemRect.height
    };
  }
  
  // Constrain position within boundaries
  function constrainPosition(left, top, item) {
    const boundaries = getBoundaries(item);
    
    left = Math.max(boundaries.minX, Math.min(left, boundaries.maxX));
    top = Math.max(boundaries.minY, Math.min(top, boundaries.maxY));
    
    return { left, top };
  }
  
  // Handle mouse down
  function onMouseDown(e) {
    const item = e.target.closest('.item');
    if (!item) return;
    
    e.preventDefault();
    
    selectedItem = item;
    isDragging = true;
    
    // Get current positions
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate offset from mouse to element's top-left corner
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;
    
    // Store original positions
    originalLeft = parseFloat(item.style.left);
    originalTop = parseFloat(item.style.top);
    
    // Store initial scroll positions
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
    
    // Add active class to container
    container.classList.add('active');
    
    // Bring selected item to front
    item.style.zIndex = '1000';
    item.style.cursor = 'grabbing';
  }
  
  // Handle mouse move
  function onMouseMove(e) {
    if (!isDragging || !selectedItem) return;
    
    e.preventDefault();
    
    const containerRect = container.getBoundingClientRect();
    
    // Calculate new position relative to container
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;
    
    // Apply boundary constraints
    const constrained = constrainPosition(newLeft, newTop, selectedItem);
    
    // Update position
    selectedItem.style.left = constrained.left + 'px';
    selectedItem.style.top = constrained.top + 'px';
    
    // Handle scrolling when dragging near edges
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const scrollThreshold = 50;
    const scrollSpeed = 15;
    
    // Check right edge for horizontal scroll
    if (mouseX > window.innerWidth - scrollThreshold) {
      container.scrollLeft += scrollSpeed;
    }
    // Check left edge for horizontal scroll
    else if (mouseX < scrollThreshold) {
      container.scrollLeft -= scrollSpeed;
    }
    
    // Check bottom edge for vertical scroll
    if (mouseY > window.innerHeight - scrollThreshold) {
      container.scrollTop += scrollSpeed;
    }
    // Check top edge for vertical scroll
    else if (mouseY < scrollThreshold) {
      container.scrollTop -= scrollSpeed;
    }
  }
  
  // Handle mouse up
  function onMouseUp(e) {
    if (!isDragging || !selectedItem) return;
    
    // Reset styles
    selectedItem.style.zIndex = '';
    selectedItem.style.cursor = '';
    
    // Remove active class
    container.classList.remove('active');
    
    // Reset drag state
    isDragging = false;
    selectedItem = null;
  }
  
  // Handle container scroll
  function onScroll() {
    if (!isDragging && selectedItem) {
      // Adjust item positions when container scrolls while not dragging
      const containerRect = container.getBoundingClientRect();
      items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        item.style.left = (itemRect.left - containerRect.left + container.scrollLeft) + 'px';
        item.style.top = (itemRect.top - containerRect.top + container.scrollTop) + 'px';
      });
    }
  }
  
  // Initialize
  initializePositions();
  
  // Add event listeners
  container.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  container.addEventListener('scroll', onScroll);
  
  // Prevent default drag behavior
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => e.preventDefault());
  });
})();
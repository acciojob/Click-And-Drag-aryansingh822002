// Your code here.

//Your code goes here 
(function() {
  const container = document.querySelector('.items');
  const items = document.querySelectorAll('.item');
  
  let selectedItem = null;
  let isDragging = false;
  let startX, startY;
  let startLeft, startTop;
  let offsetX, offsetY;
  
  // Set initial positions for absolute positioning
  function initializePositions() {
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Set position relative to container
      item.style.position = 'absolute';
      item.style.left = (rect.left - containerRect.left) + 'px';
      item.style.top = (rect.top - containerRect.top) + 'px';
      item.style.width = rect.width + 'px';
      item.style.height = rect.height + 'px';
      item.style.margin = '0';
      item.style.transform = window.getComputedStyle(item).transform;
    });
  }
  
  // Get container boundaries
  function getContainerBoundaries() {
    const containerRect = container.getBoundingClientRect();
    return {
      minX: 0,
      minY: 0,
      maxX: containerRect.width,
      maxY: containerRect.height
    };
  }
  
  // Constrain position within boundaries
  function constrainPosition(item, left, top) {
    const boundaries = getContainerBoundaries();
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate item dimensions relative to container
    const itemWidth = itemRect.width;
    const itemHeight = itemRect.height;
    
    // Constrain X position
    left = Math.max(boundaries.minX, Math.min(left, boundaries.maxX - itemWidth));
    
    // Constrain Y position
    top = Math.max(boundaries.minY, Math.min(top, boundaries.maxY - itemHeight));
    
    return { left, top };
  }
  
  // Handle mouse down
  function onMouseDown(e) {
    const item = e.target.closest('.item');
    if (!item) return;
    
    e.preventDefault();
    
    selectedItem = item;
    isDragging = true;
    
    // Get current position
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate offset from mouse to element's top-left corner
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;
    
    // Store start positions
    startLeft = itemRect.left - containerRect.left;
    startTop = itemRect.top - containerRect.top;
    
    // Add active class to container
    container.classList.add('active');
    
    // Bring selected item to front
    item.style.zIndex = '1000';
  }
  
  // Handle mouse move
  function onMouseMove(e) {
    if (!isDragging || !selectedItem) return;
    
    e.preventDefault();
    
    const containerRect = container.getBoundingClientRect();
    
    // Calculate new position
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;
    
    // Apply boundary constraints
    const constrained = constrainPosition(selectedItem, newLeft, newTop);
    
    // Update position
    selectedItem.style.left = constrained.left + 'px';
    selectedItem.style.top = constrained.top + 'px';
  }
  
  // Handle mouse up
  function onMouseUp(e) {
    if (!isDragging || !selectedItem) return;
    
    // Reset z-index
    selectedItem.style.zIndex = '';
    
    // Remove active class
    container.classList.remove('active');
    
    // Reset drag state
    isDragging = false;
    selectedItem = null;
  }
  
  // Handle scroll to adjust positions
  function onScroll() {
    if (selectedItem && isDragging) {
      // Recalculate position during scroll if dragging
      const itemRect = selectedItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      selectedItem.style.left = (itemRect.left - containerRect.left) + 'px';
      selectedItem.style.top = (itemRect.top - containerRect.top) + 'px';
    }
  }
  
  // Handle window resize
  function onResize() {
    items.forEach(item => {
      const left = parseFloat(item.style.left) || 0;
      const top = parseFloat(item.style.top) || 0;
      const constrained = constrainPosition(item, left, top);
      
      item.style.left = constrained.left + 'px';
      item.style.top = constrained.top + 'px';
    });
  }
  
  // Initialize
  initializePositions();
  
  // Add event listeners
  container.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  container.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
  
  // Prevent default drag behavior
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => e.preventDefault());
  });
  
})();
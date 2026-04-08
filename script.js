// Your code here.
// Draggable Cubes - Pure JavaScript Solution
(function() {
  // Get the defined area (container) and grid container
  const container = document.querySelector('.items');
  const gridContainer = document.querySelector('.items');
  
  if (!container) {
    console.error('Container not found');
    return;
  }
  
  // Make sure container has relative positioning for absolute positioning of cubes
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }
  
  // Get all cubes
  let cubes = document.querySelectorAll('.item');
  
  // Drag state variables
  let draggedCube = null;
  let isDragging = false;
  let startX = 0, startY = 0;
  let initialLeft = 0, initialTop = 0;
  let dragThreshold = 5; // pixels to move before starting drag
  let hasMoved = false;
  
  // Store original positions for grid layout
  let originalParent = null;
  let originalIndex = null;
  
  // Function to get container boundaries
  function getBoundaries(cube) {
    const containerRect = container.getBoundingClientRect();
    const cubeRect = cube.getBoundingClientRect();
    const cubeWidth = cubeRect.width;
    const cubeHeight = cubeRect.height;
    
    return {
      minX: containerRect.left,
      maxX: containerRect.right - cubeWidth,
      minY: containerRect.top,
      maxY: containerRect.bottom - cubeHeight
    };
  }
  
  // Function to clamp position within boundaries
  function clampPosition(clientX, clientY, cube) {
    const boundaries = getBoundaries(cube);
    let clampedX = clientX;
    let clampedY = clientY;
    
    if (clampedX < boundaries.minX) clampedX = boundaries.minX;
    if (clampedX > boundaries.maxX) clampedX = boundaries.maxX;
    if (clampedY < boundaries.minY) clampedY = boundaries.minY;
    if (clampedY > boundaries.maxY) clampedY = boundaries.maxY;
    
    return { x: clampedX, y: clampedY };
  }
  
  // Function to update cube position during drag
  function updateDragPosition(clientX, clientY) {
    if (!draggedCube || !isDragging) return;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;
    
    // Get container relative coordinates
    const containerRect = container.getBoundingClientRect();
    const cubeRect = draggedCube.getBoundingClientRect();
    const cubeWidth = cubeRect.width;
    const cubeHeight = cubeRect.height;
    
    // Calculate boundaries in container-relative coordinates
    const maxLeft = containerRect.width - cubeWidth;
    const maxTop = containerRect.height - cubeHeight;
    
    // Clamp to container boundaries
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));
    
    // Apply new position
    draggedCube.style.position = 'absolute';
    draggedCube.style.left = newLeft + 'px';
    draggedCube.style.top = newTop + 'px';
    draggedCube.style.margin = '0';
    draggedCube.style.zIndex = '9999';
  }
  
  // Mouse move handler
  function onMouseMove(e) {
    if (!draggedCube) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // Check if we've moved past the drag threshold
    if (!isDragging) {
      const deltaX = Math.abs(clientX - startX);
      const deltaY = Math.abs(clientY - startY);
      
      if (deltaX > dragThreshold || deltaY > dragThreshold) {
        // Start dragging
        isDragging = true;
        hasMoved = true;
        
        // Convert cube from grid to absolute positioning
        const containerRect = container.getBoundingClientRect();
        const cubeRect = draggedCube.getBoundingClientRect();
        
        // Store initial position in container-relative coordinates
        initialLeft = cubeRect.left - containerRect.left;
        initialTop = cubeRect.top - containerRect.top;
        
        // Apply absolute positioning
        draggedCube.style.position = 'absolute';
        draggedCube.style.left = initialLeft + 'px';
        draggedCube.style.top = initialTop + 'px';
        draggedCube.style.width = cubeRect.width + 'px';
        draggedCube.style.height = cubeRect.height + 'px';
        draggedCube.style.margin = '0';
        draggedCube.style.zIndex = '9999';
        draggedCube.classList.add('dragging');
        
        // Update start positions for drag
        startX = clientX;
        startY = clientY;
      }
    } else {
      // Currently dragging - update position
      e.preventDefault();
      
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      
      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;
      
      // Get container boundaries
      const containerRect = container.getBoundingClientRect();
      const cubeRect = draggedCube.getBoundingClientRect();
      const maxLeft = containerRect.width - cubeRect.width;
      const maxTop = containerRect.height - cubeRect.height;
      
      // Clamp to boundaries
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      
      // Update position
      draggedCube.style.left = newLeft + 'px';
      draggedCube.style.top = newTop + 'px';
    }
  }
  
  // Mouse up handler
  function onMouseUp(e) {
    if (draggedCube) {
      if (!hasMoved) {
        // Click without dragging - do nothing, cube stays in place
        // No action needed
      } else if (isDragging) {
        // Drag completed - cube stays in its new absolute position
        // Ensure cube is within boundaries
        const containerRect = container.getBoundingClientRect();
        const cubeRect = draggedCube.getBoundingClientRect();
        let currentLeft = parseFloat(draggedCube.style.left);
        let currentTop = parseFloat(draggedCube.style.top);
        const maxLeft = containerRect.width - cubeRect.width;
        const maxTop = containerRect.height - cubeRect.height;
        
        // Final boundary enforcement
        currentLeft = Math.max(0, Math.min(currentLeft, maxLeft));
        currentTop = Math.max(0, Math.min(currentTop, maxTop));
        draggedCube.style.left = currentLeft + 'px';
        draggedCube.style.top = currentTop + 'px';
        
        // Remove dragging class
        draggedCube.classList.remove('dragging');
      }
      
      // Reset drag state
      draggedCube = null;
      isDragging = false;
      hasMoved = false;
      
      // Remove global event listeners
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      // Restore text selection
      document.body.style.userSelect = '';
    }
  }
  
  // Mouse down handler for each cube
  function onMouseDown(e) {
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    e.stopPropagation();
    
    // Get the cube that was clicked
    const cube = e.currentTarget;
    
    // Don't start a new drag if already dragging
    if (isDragging) return;
    
    // Store the cube being dragged
    draggedCube = cube;
    hasMoved = false;
    isDragging = false;
    
    // Store mouse start position
    startX = e.clientX;
    startY = e.clientY;
    
    // Store the cube's current position if it's already absolute
    if (cube.style.position === 'absolute') {
      initialLeft = parseFloat(cube.style.left);
      initialTop = parseFloat(cube.style.top);
    } else {
      // For grid-positioned cubes, we'll calculate position when drag starts
      initialLeft = 0;
      initialTop = 0;
    }
    
    // Disable text selection while dragging
    document.body.style.userSelect = 'none';
    
    // Add global event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
  
  // Function to attach drag listeners to all cubes
  function attachDragListeners() {
    cubes = document.querySelectorAll('.item');
    cubes.forEach(cube => {
      cube.removeEventListener('mousedown', onMouseDown);
      cube.addEventListener('mousedown', onMouseDown);
    });
  }
  
  // Handle window resize - reposition absolute positioned cubes to stay within bounds
  function handleResize() {
    const absoluteCubes = document.querySelectorAll('.item[style*="position: absolute"]');
    absoluteCubes.forEach(cube => {
      if (cube.style.position === 'absolute') {
        const containerRect = container.getBoundingClientRect();
        let left = parseFloat(cube.style.left);
        let top = parseFloat(cube.style.top);
        const cubeWidth = cube.offsetWidth;
        const cubeHeight = cube.offsetHeight;
        const maxLeft = Math.max(0, containerRect.width - cubeWidth);
        const maxTop = Math.max(0, containerRect.height - cubeHeight);
        
        left = Math.min(maxLeft, Math.max(0, left));
        top = Math.min(maxTop, Math.max(0, top));
        
        cube.style.left = left + 'px';
        cube.style.top = top + 'px';
      }
    });
  }
  
  // Initialize drag functionality
  function init() {
    attachDragListeners();
    window.addEventListener('resize', handleResize);
  }
  
  // Start the application
  init();
})();
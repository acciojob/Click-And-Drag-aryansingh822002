// Your code here.
// Draggable Cubes - Preserving Original Scroll Behavior
(function() {
  // Get elements
  const container = document.querySelector('.items');
  
  if (!container) {
    console.error('Container not found');
    return;
  }
  
  // Get all cubes
  let cubes = document.querySelectorAll('.item');
  
  // Drag state variables
  let draggedCube = null;
  let isDragging = false;
  let startX = 0, startY = 0;
  let initialLeft = 0, initialTop = 0;
  let initialScrollLeft = 0;
  let hasMoved = false;
  let dragThreshold = 5;
  
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
  
  // Function to update cube position during drag
  function updateDragPosition(clientX, clientY) {
    if (!draggedCube || !isDragging) return;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;
    
    // Get container boundaries
    const containerRect = container.getBoundingClientRect();
    const cubeRect = draggedCube.getBoundingClientRect();
    const cubeWidth = cubeRect.width;
    const cubeHeight = cubeRect.height;
    
    // Calculate boundaries
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
    
    if (!isDragging) {
      const deltaX = Math.abs(clientX - startX);
      const deltaY = Math.abs(clientY - startY);
      
      if (deltaX > dragThreshold || deltaY > dragThreshold) {
        // Start dragging
        isDragging = true;
        hasMoved = true;
        
        // Store initial scroll position
        initialScrollLeft = container.scrollLeft;
        
        // Convert cube from grid to absolute positioning
        const containerRect = container.getBoundingClientRect();
        const cubeRect = draggedCube.getBoundingClientRect();
        
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
        
        startX = clientX;
        startY = clientY;
      }
    } else {
      e.preventDefault();
      
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      
      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;
      
      const containerRect = container.getBoundingClientRect();
      const cubeRect = draggedCube.getBoundingClientRect();
      const maxLeft = containerRect.width - cubeRect.width;
      const maxTop = containerRect.height - cubeRect.height;
      
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      
      draggedCube.style.left = newLeft + 'px';
      draggedCube.style.top = newTop + 'px';
    }
  }
  
  // Mouse up handler
  function onMouseUp(e) {
    if (draggedCube) {
      if (!hasMoved) {
        // Click without dragging - cube stays in place
        // No action needed
      } else if (isDragging) {
        // Ensure cube is within boundaries
        const containerRect = container.getBoundingClientRect();
        const cubeRect = draggedCube.getBoundingClientRect();
        let currentLeft = parseFloat(draggedCube.style.left);
        let currentTop = parseFloat(draggedCube.style.top);
        const maxLeft = containerRect.width - cubeRect.width;
        const maxTop = containerRect.height - cubeRect.height;
        
        currentLeft = Math.max(0, Math.min(currentLeft, maxLeft));
        currentTop = Math.max(0, Math.min(currentTop, maxTop));
        draggedCube.style.left = currentLeft + 'px';
        draggedCube.style.top = currentTop + 'px';
        
        draggedCube.classList.remove('dragging');
      }
      
      draggedCube = null;
      isDragging = false;
      hasMoved = false;
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.userSelect = '';
    }
  }
  
  // Mouse down handler
  function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const cube = e.currentTarget;
    
    if (isDragging) return;
    
    draggedCube = cube;
    hasMoved = false;
    isDragging = false;
    
    startX = e.clientX;
    startY = e.clientY;
    
    if (cube.style.position === 'absolute') {
      initialLeft = parseFloat(cube.style.left);
      initialTop = parseFloat(cube.style.top);
    } else {
      initialLeft = 0;
      initialTop = 0;
    }
    
    document.body.style.userSelect = 'none';
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
  
  // Handle container click and drag for scrolling (original functionality)
  let isContainerDragging = false;
  let containerStartX = 0;
  let containerStartScrollLeft = 0;
  
  function onContainerMouseDown(e) {
    // Only trigger container drag if not clicking on a cube
    if (e.target.classList.contains('item')) return;
    
    e.preventDefault();
    isContainerDragging = true;
    containerStartX = e.pageX;
    containerStartScrollLeft = container.scrollLeft;
    container.classList.add('active');
  }
  
  function onContainerMouseMove(e) {
    if (!isContainerDragging) return;
    e.preventDefault();
    const walk = (e.pageX - containerStartX) * 2;
    container.scrollLeft = containerStartScrollLeft - walk;
  }
  
  function onContainerMouseUp() {
    isContainerDragging = false;
    container.classList.remove('active');
  }
  
  // Attach drag listeners to all cubes
  function attachDragListeners() {
    cubes = document.querySelectorAll('.item');
    cubes.forEach(cube => {
      cube.removeEventListener('mousedown', onMouseDown);
      cube.addEventListener('mousedown', onMouseDown);
    });
  }
  
  // Handle window resize
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
  
  // Initialize
  function init() {
    attachDragListeners();
    window.addEventListener('resize', handleResize);
    
    // Add container drag listeners for scrolling
    container.addEventListener('mousedown', onContainerMouseDown);
    window.addEventListener('mousemove', onContainerMouseMove);
    window.addEventListener('mouseup', onContainerMouseUp);
  }
  
  init();
})();
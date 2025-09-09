let cart = [], 
totalPrice = 0, 
allPlants = [];
    const plantsGrid = document.getElementById('plants-grid');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const categoryItems = document.querySelectorAll('.category-item');
    const loadingSpinner = document.getElementById('loading-spinner');
    const mobileCategory = document.getElementById('mobile-category');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

 // Filter plants by category
    function loadPlantsByCategory(category) {
      showLoading(true);
      setTimeout(() => {
        let filtered = [];
        if (category === "All Trees") {
          filtered = allPlants.slice(0, 9);
        } else {
          filtered = allPlants.filter(p => p.category === category).slice(0, 3);
        }
        displayPlants(filtered);
        showLoading(false);
      }, 300);
    }


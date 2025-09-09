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


function displayPlants(plants) {
    plantsGrid.innerHTML = "";
    if (!plants.length) {
        plantsGrid.innerHTML = '<p class="text-center text-gray-500">No plants found.</p>';
        return;
    }


plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow hover:-translate-y-1 transition p-4 flex flex-col';
        card.innerHTML = `
          <div class="h-48 overflow-hidden rounded-lg">
            <img src="${plant.image}" class="w-full h-full object-cover hover:scale-110 transition">
          </div>
          <div class="mt-4 flex flex-col flex-grow">
            <span class="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">${plant.category}</span>
            <h3 class="text-lg font-semibold text-green-700 mb-2">${plant.name}</h3>
            <p class="text-sm text-gray-600 flex-grow">${plant.description ? plant.description.substring(0, 80) : ""}...</p>
            <div class="mt-3 font-bold text-green-700 text-lg">$${plant.price}</div>
            <button class="mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold add-to-cart" data-id="${plant.id}">Add to Cart</button>
          </div>`;
        plantsGrid.appendChild(card);
      });

          document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.onclick = () => {
          const plant = allPlants.find(p => p.id == btn.dataset.id);
          alert("Added to Cart"); 
          addToCart(plant);
        };
      });
    }

    
    // Load all plants once
    async function loadAllPlants() {
      showLoading(true);
      try {
        const res = await fetch("https://openapi.programming-hero.com/api/plants");
        const data = await res.json();
        allPlants = data.plants;
        displayPlants(allPlants.slice(0, 9)); // show first 9
      } catch (e) {
        plantsGrid.innerHTML = '<p class="text-center text-red-500">Error loading plants.</p>';
      } finally { showLoading(false); }
    }

// Sample business data
const businesses = [
    {
        id: 1,
        name: "Daily Grind Cafe",
        owner: "Mandy Lou Bernado",
        category: "cafe",
        location: "Highway, Manaoag, Pangasinan",
        hours: {
            weekday: "7:00 AM to 5:00 PM",
            saturday: "7:00 AM to 8:00 PM",
            sunday: "7:00 AM to 3:00 PM"
        }
    },
    {
        id: 2,
        name: "Troy's Ultime Gym",
        owner: "Caster Troy Andres",
        category: "gym",
        location: "Downtown, Manaoag, Pangasinan",
        hours: {
            weekday: "6:00 AM to 10:00 PM",
            saturday: "7:00 AM to 9:00 PM",
            sunday: "8:00 AM to 8:00 PM"
        }
    },
    {
        id: 3,
        name: "Troy's Ultime Gym",
        owner: "Caster Troy Andres",
        category: "gym",
        location: "Downtown, Manaoag, Pangasinan",
        hours: {
            weekday: "6:00 AM to 10:00 PM",
            saturday: "7:00 AM to 9:00 PM",
            sunday: "8:00 AM to 8:00 PM"
        }
    },
    {
        id: 4,
        name: "Troy's Ultime Gym",
        owner: "Caster Troy Andres",
        category: "gym",
        location: "Downtown, Manaoag, Pangasinan",
        hours: {
            weekday: "6:00 AM to 10:00 PM",
            saturday: "7:00 AM to 9:00 PM",
            sunday: "8:00 AM to 8:00 PM"
        }
    },
    {
        id: 5,
        name: "Sweet Delights Bakery",
        owner: "Maria Santos",
        category: "bakery",
        location: "Main Street, Manaoag, Pangasinan",
        hours: {
            weekday: "5:00 AM to 7:00 PM",
            saturday: "5:00 AM to 8:00 PM",
            sunday: "6:00 AM to 6:00 PM"
        }
    },
    {
        id: 6,
        name: "Sunrise Cafe",
        owner: "John Reyes",
        category: "cafe",
        location: "Plaza Area, Manaoag, Pangasinan",
        hours: {
            weekday: "6:00 AM to 6:00 PM",
            saturday: "6:00 AM to 7:00 PM",
            sunday: "7:00 AM to 5:00 PM"
        }
    }
];

// Initialize browse page
function initBrowsePage() {
    const businessGrid = document.getElementById('businessGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('detailsModal');
    const closeModal = document.querySelector('.close-modal');

    if (!businessGrid) return;

    // Render businesses
    function renderBusinesses(filter = 'all', searchTerm = '') {
        businessGrid.innerHTML = '';
        
        const filtered = businesses.filter(business => {
            const matchesFilter = filter === 'all' || business.category === filter;
            const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                business.owner.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        filtered.forEach(business => {
            const card = document.createElement('div');
            card.className = 'business-card';
            card.innerHTML = `
                <div class="business-image"></div>
                <div class="business-info">
                    <h3>${business.name}</h3>
                    <p>Owner: ${business.owner}</p>
                    <button class="view-details-btn" data-id="${business.id}">View Details</button>
                </div>
            `;
            businessGrid.appendChild(card);
        });

        // Add click handlers to view details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const businessId = parseInt(btn.dataset.id);
                showBusinessDetails(businessId);
            });
        });
    }

    // Show business details modal
    function showBusinessDetails(businessId) {
        const business = businesses.find(b => b.id === businessId);
        if (!business) return;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="modal-image"></div>
            <h2>${business.name}</h2>
            <p><strong>Owner:</strong> ${business.owner}</p>
            <p><strong>Location:</strong> ${business.location}</p>
            <div class="business-hours">
                <h3>Business Hours</h3>
                <ul>
                    <li>Mon-Fri: ${business.hours.weekday}</li>
                    <li>Saturday: ${business.hours.saturday}</li>
                    <li>Sunday: ${business.hours.sunday}</li>
                </ul>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            renderBusinesses(filter, searchInput.value);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            renderBusinesses(activeFilter, e.target.value);
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initial render
    renderBusinesses();
}

// Initialize home page
function initHomePage() {
    const recommendedGrid = document.getElementById('recommendedGrid');
    if (!recommendedGrid) return;

    // Show 4 random businesses as recommendations
    const recommended = businesses.slice(0, 4);
    
    recommended.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.innerHTML = `
            <div class="business-image"></div>
            <div class="business-info">
                <h3>${business.name}</h3>
                <p>Owner: ${business.owner}</p>
                <button class="view-details-btn">View Details</button>
            </div>
        `;
        recommendedGrid.appendChild(card);
    });
}

// Initialize profile page
function initProfilePage() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        alert('Profile saved successfully!');
        console.log({ firstName, lastName, email, phone });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initBrowsePage();
    initHomePage();
    initProfilePage();
});

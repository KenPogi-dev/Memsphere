// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
});

// View switching
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all views
        views.forEach(view => view.classList.remove('active'));
        
        // Show selected view
        const viewName = item.dataset.view;
        document.getElementById(`${viewName}-view`).classList.add('active');
    });
});

// Handle Approve button click
function handleApprove(button) {
    const row = button.closest('tr');
    const businessName = row.cells[0].textContent;
    const statusBadge = row.querySelector('.status-badge');
    
    // Update status badge
    statusBadge.textContent = 'Active';
    statusBadge.classList.remove('pending');
    statusBadge.classList.add('active');
    
    // Replace buttons with approved message
    const actionCell = row.cells[4];
    actionCell.innerHTML = '<span style="color: #2d5f2e; font-weight: 500;">✓ Approved</span>';
    
    // Show confirmation
    alert(`${businessName} has been approved!`);
}

// Handle Decline button click
function handleDecline(button) {
    const row = button.closest('tr');
    const businessName = row.cells[0].textContent;
    
    // Confirm decline action
    if (confirm(`Are you sure you want to decline ${businessName}?`)) {
        // Fade out and remove the row
        row.style.transition = 'opacity 0.3s';
        row.style.opacity = '0';
        
        setTimeout(() => {
            row.remove();
        }, 300);
        
        alert(`${businessName} has been declined.`);
    }
}

// Open business details modal
function openBusinessModal(button) {
    const card = button.closest('.business-card');
    const businessData = JSON.parse(card.dataset.business);
    const modal = document.getElementById('businessModal');
    const modalBody = document.getElementById('modalBody');
    
    // Create modal content based on status
    if (businessData.status === 'active') {
        modalBody.innerHTML = `
            <span class="modal-status-badge active">Active</span>
            <div class="modal-image"></div>
            <h2 class="modal-title">${businessData.name}</h2>
            <div class="modal-info">
                <p><strong>Owner:</strong> ${businessData.owner}</p>
                <p><strong>Location:</strong> ${businessData.location}</p>
                <p><strong>Date Registered:</strong> ${businessData.date}</p>
            </div>
            <div class="modal-hours">
                <h3>Business Hours</h3>
                <p>Mon-Fri: ${businessData.hours.monFri}</p>
                <p>Saturday: ${businessData.hours.saturday}</p>
                <p>Sunday: ${businessData.hours.sunday}</p>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <span class="modal-status-badge pending">Pending</span>
            <div class="modal-image"></div>
            <h2 class="modal-title">${businessData.name}</h2>
            <div class="modal-info">
                <p><strong>Owner:</strong> ${businessData.owner}</p>
                <p><strong>Location:</strong> ${businessData.location}</p>
                <p><strong>Date Registered:</strong> ${businessData.date}</p>
            </div>
        `;
    }
    
    modal.classList.add('show');
}

// Close business details modal
function closeBusinessModal() {
    const modal = document.getElementById('businessModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('businessModal');
    if (event.target === modal) {
        closeBusinessModal();
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session storage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Approve/Decline functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-approve')) {
        const row = e.target.closest('tr');
        const businessName = row.querySelector('td:first-child').textContent;
        
        if (confirm(`Approve ${businessName}?`)) {
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.textContent = 'Active';
            statusBadge.classList.remove('pending');
            statusBadge.classList.add('active');
            
            // Remove the row after a short delay
            setTimeout(() => {
                row.style.opacity = '0';
                setTimeout(() => row.remove(), 300);
            }, 500);
        }
    }
    
    if (e.target.classList.contains('btn-decline')) {
        const row = e.target.closest('tr');
        const businessName = row.querySelector('td:first-child').textContent;
        
        if (confirm(`Decline ${businessName}?`)) {
            // Remove the row with animation
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 300);
        }
    }
    
    // Filter button
    if (e.target.classList.contains('btn-secondary') && e.target.textContent.includes('Filter')) {
        alert('Filter functionality - Coming soon!');
    }
    
    // Sort button
    if (e.target.classList.contains('btn-secondary') && e.target.textContent.includes('Sort')) {
        alert('Sort functionality - Coming soon!');
    }
    
    // Notification bell
    if (e.target.classList.contains('icon-btn') && e.target.textContent.includes('🔔')) {
        alert('Notifications - No new notifications');
    }
    
    // User profile
    if (e.target.classList.contains('icon-btn') && e.target.textContent.includes('👤')) {
        alert('User Profile - Coming soon!');
    }
    
    // View Details button
    if (e.target.classList.contains('btn-primary')) {
        const card = e.target.closest('.business-card');
        const businessName = card.querySelector('h3').textContent;
        const owner = card.querySelector('p').textContent;
        const statusBadge = card.querySelector('.status-badge');
        const status = statusBadge.textContent;
        
        showBusinessModal(businessName, owner, status);
    }
});

// Modal functionality
function showBusinessModal(businessName, owner, status) {
    const modal = document.getElementById('businessModal');
    const modalName = modal.querySelector('.modal-business-name');
    const modalDetails = modal.querySelector('.modal-details');
    const modalStatusBadge = modal.querySelector('.modal-status-badge');
    
    modalName.textContent = businessName;
    modalStatusBadge.textContent = status;
    modalStatusBadge.className = 'modal-status-badge ' + status.toLowerCase();
    
    if (status === 'Active') {
        modalDetails.innerHTML = `
            <p><strong>Owner:</strong> ${owner.replace('Owned by ', '')}</p>
            <p><strong>Location:</strong> Downtown, Manaoag, Pangasinan</p>
            <p><strong>Date Registered:</strong> February 01, 2026</p>
            <p><strong>Business Hours:</strong></p>
            <p style="margin-left: 150px;">Mon-Fri: 6:00 AM to 10:00 PM</p>
            <p style="margin-left: 150px;">Saturday: 7:00 AM to 9:00 PM</p>
            <p style="margin-left: 150px;">Sunday: 8:00 AM to 8:00 PM</p>
        `;
    } else {
        modalDetails.innerHTML = `
            <p><strong>Owner:</strong> ${owner.replace('Owned by ', '')}</p>
            <p><strong>Location:</strong> Downtown, Manaoag, Pangasinan</p>
            <p><strong>Date Registered:</strong> February 01, 2026</p>
        `;
    }
    
    modal.classList.add('show');
}

// Close modal
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('businessModal').classList.remove('show');
});

// Close modal when clicking outside
document.getElementById('businessModal').addEventListener('click', (e) => {
    if (e.target.id === 'businessModal') {
        document.getElementById('businessModal').classList.remove('show');
    }
});

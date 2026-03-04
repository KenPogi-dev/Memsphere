// Sample application data
const applications = [
    {
        name: "Caster Troy Andres",
        applied: "Daily Grind 1",
        dateApplied: "21/02/2026",
        status: "Approve"
    },
    {
        name: "Darilla Coole",
        applied: "Daily Grind 2",
        dateApplied: "21/01/2026",
        status: "Approve"
    },
    {
        name: "Kendrick Lamar",
        applied: "Trey's Ult 1",
        dateApplied: "14/02/2026",
        status: "Approve"
    },
    {
        name: "Alexa Grace Junio",
        applied: "Trey's Ult 2",
        dateApplied: "14/01/2026",
        status: "Approve"
    }
];

// Populate applications table
function populateApplicationsTable() {
    const tableBody = document.getElementById('applicationsTable');
    
    applications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.applied}</td>
            <td>${app.dateApplied}</td>
            <td>
                <div class="action-buttons">
                    <span class="status-badge">${app.status}</span>
                    <button class="btn btn-decline" onclick="handleDecline('${app.name}')">Decline</button>
                    <button class="btn btn-details" onclick="handleViewDetails('${app.name}')">View Details</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle decline action
function handleDecline(name) {
    if (confirm(`Are you sure you want to decline ${name}'s application?`)) {
        console.log(`Declined application for ${name}`);
        alert(`Application for ${name} has been declined.`);
    }
}

// Handle view details action
function handleViewDetails(name) {
    console.log(`Viewing details for ${name}`);
    alert(`Viewing details for ${name}`);
}

// Handle add promotion
document.addEventListener('DOMContentLoaded', () => {
    populateApplicationsTable();
    
    document.getElementById('addPromotion').addEventListener('click', () => {
        console.log('Add Promotion clicked');
        alert('Add Promotion feature - Coming soon!');
    });
    
    document.getElementById('addMembership').addEventListener('click', () => {
        console.log('Add Membership Plan clicked');
        alert('Add Membership Plan feature - Coming soon!');
    });
});

// Animate stats on load
window.addEventListener('load', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

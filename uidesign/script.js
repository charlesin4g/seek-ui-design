// Global state
let currentPage = 'welcome';
let activities = [];
let travelPlans = [];
let visitedLocations = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupNavigation();
    setupWelcomePage();
    setupDateTime();
    initializeCharts();
    populateActivityFeed();
    populateTravelPlans();
    setupMap();
    setupInteractions();
});

// Initialize mock data
function initializeData() {
    // Mock activities
    activities = [
        {
            id: 1,
            location: '山峰步道',
            date: '2024-12-08',
            duration: '3小时25分',
            distance: '8.5 公里',
            photos: 12,
            elevation: '450米'
        },
        {
            id: 2,
            location: '森林保护区环线',
            date: '2024-12-07',
            duration: '2小时15分',
            distance: '5.2 公里',
            photos: 8,
            elevation: '120米',
            rating: 4.5,
            description: '登顶光明顶，观日出云海，途经迎客松、飞来石等着称景点。'
        },
        {
            id: 3,
            location: '海岸小径',
            title: '西湖环湖骑行',
            date: '2024-12-06',
            duration: '4小时10分',
            distance: '12.3 公里',
            photos: 20,
            elevation: '80米',
            rating: 5,
            description: '轻松惬意的环湖骑行，欣赏西湖十景，感受江南水乡的魅力。'
        }
    ];

    // Mock travel plans
    travelPlans = [
        {
            id: 1,
            title: '山野探险周末',
            status: 'upcoming',
            startDate: '2024-12-15',
            endDate: '2024-12-17',
            description: '周末徒步旅行，探索山地步道，享受大自然'
        },
        {
            id: 2,
            title: '城市观光与博物馆',
            status: 'upcoming',
            startDate: '2024-12-20',
            endDate: '2024-12-22',
            description: '城市文化探索，参观博物馆，品尝当地美食'
        },
        {
            id: 3,
            title: '海滩休闲',
            status: 'completed',
            startDate: '2024-11-25',
            endDate: '2024-11-28',
            description: '轻松的海滩度假，水上运动和日落美景'
        }
    ];

    // Mock visited locations
    visitedLocations = [
        {
            id: 1,
            name: '科罗拉多州丹佛',
            x: 20,
            y: 30,
            visitDate: '2024年11月',
            route: '山地徒步路线',
            expenses: '￥3,045'
        },
        {
            id: 2,
            name: '华盛顿州西雅图',
            x: 15,
            y: 25,
            visitDate: '2024年10月',
            route: '海岸探索路线',
            expenses: '￥2,164'
        },
        {
            id: 3,
            name: '加利福尼亚州旧金山',
            x: 12,
            y: 35,
            visitDate: '2024年9月',
            route: '城市步行游览',
            expenses: '￥3,921'
        },
        {
            id: 4,
            name: '俄勒冈州波特兰',
            x: 13,
            y: 28,
            visitDate: '2024年8月',
            route: '森林步道',
            expenses: '￥1,892'
        }
    ];
}

// Setup navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
}

// Page navigation
function navigateToPage(pageName) {
    // Hide current page
    const currentPageElement = document.getElementById(currentPage + 'Page');
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show new page
    const newPageElement = document.getElementById(pageName + 'Page');
    if (newPageElement) {
        newPageElement.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeNavBtn = document.querySelector(`[data-page="${pageName}"]`);
    if (activeNavBtn) {
        activeNavBtn.classList.add('active');
    }
    
    currentPage = pageName;
}

// Setup welcome page with auto-redirect
function setupWelcomePage() {
    setTimeout(() => {
        navigateToPage('home');
    }, 1000);
}

// Setup date and time display
function setupDateTime() {
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        const dateTimeElement = document.getElementById('dateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleDateString('zh-CN', options);
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
}

// Initialize charts
function initializeCharts() {
    const canvas = document.getElementById('heartRateChartNew');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawHeartRateChartNew(ctx);
    }
}

// Draw new heart rate chart
function drawHeartRateChartNew(ctx) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const data = [70, 72, 78, 85, 88, 85, 82, 78, 75, 80];
    const labels = ['06:00', '09:00', '12:00', '15:00', '现在'];
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const maxValue = 100;
    const minValue = 60;

    // Draw grid lines and labels
    ctx.strokeStyle = '#f0f0f0';
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight / 4) * i;
        const value = Math.round(maxValue - (maxValue - minValue) * (i / 4));
        
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        ctx.textAlign = 'right';
        ctx.fillText(value, padding.left - 10, y + 4);
    }

    // Draw labels
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
        const x = padding.left + (chartWidth / (labels.length - 1)) * i;
        ctx.fillText(label, x, height - 10);
    });
    
    // Draw path
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    data.forEach((value, i) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * i;
        const y = padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(248, 113, 113, 0.1)');
    gradient.addColorStop(1, 'rgba(248, 113, 113, 0)');
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    data.forEach((value, i) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * i;
        const y = padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fill();
    
    // Draw highlight point
    const highlightIndex = 5;
    const hx = padding.left + (chartWidth / (data.length - 1)) * highlightIndex;
    const hy = padding.top + chartHeight - ((data[highlightIndex] - minValue) / (maxValue - minValue)) * chartHeight;
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(hx, hy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Draw tooltip
    drawTooltip(ctx, hx, hy - 15, `12:00`, `value: ${data[highlightIndex]}`);
}

function drawTooltip(ctx, x, y, time, value) {
    const rectWidth = 80;
    const rectHeight = 45;
    const rectX = x - rectWidth / 2;
    const rectY = y - rectHeight - 10;
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 8);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(time, x, rectY + 18);
    
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 12px Inter';
    ctx.fillText(value, x, rectY + 36);
}

// Populate activity feed
function populateActivityFeed() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityElement = createActivityElement(activity);
        activityList.appendChild(activityElement);
    });
}

// Create activity element
function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    
    // Generate random placeholder images
    const images = Array.from({ length: Math.min(activity.photos, 3) }, (_, i) => 
        `https://picsum.photos/seed/${activity.location.replace(/\s/g, '')}${i}/80/80.jpg`
    );
    
    div.innerHTML = `
        <div class="activity-header">
            <div class="activity-location">${activity.location}</div>
            <div class="activity-date">${formatDate(activity.date)}</div>
        </div>
        <div class="activity-details">
            <div class="activity-detail">
                <div class="value">${activity.duration}</div>
                <div class="label">Duration</div>
            </div>
            <div class="activity-detail">
                <div class="value">${activity.distance}</div>
                <div class="label">Distance</div>
            </div>
            <div class="activity-detail">
                <div class="value">${activity.photos}</div>
                <div class="label">Photos</div>
            </div>
        </div>
        <div class="activity-images">
            ${images.map(src => `<img src="${src}" alt="${activity.location}">`).join('')}
        </div>
    `;
    
    return div;
}

// Populate travel plans
function populateTravelPlans() {
    const planList = document.getElementById('planList');
    if (!planList) return;
    
    planList.innerHTML = '';
    
    travelPlans.forEach(plan => {
        const planElement = createPlanElement(plan);
        planList.appendChild(planElement);
    });
}

// Create plan element
function createPlanElement(plan) {
    const div = document.createElement('div');
    div.className = 'plan-item';
    
    div.innerHTML = `
        <div class="plan-header">
            <div class="plan-title">${plan.title}</div>
            <div class="plan-status ${plan.status}">${plan.status}</div>
        </div>
        <div class="plan-dates">
            ${formatDateRange(plan.startDate, plan.endDate)}
        </div>
        <div class="plan-description">${plan.description}</div>
    `;
    
    return div;
}

// Setup map with location markers
function setupMap() {
    const map = document.getElementById('map');
    if (!map) return;
    
    // Clear existing markers
    map.querySelectorAll('.location-marker').forEach(marker => marker.remove());
    
    // Add location markers
    visitedLocations.forEach(location => {
        const marker = document.createElement('div');
        marker.className = 'location-marker';
        marker.textContent = location.id;
        marker.style.left = `${location.x}%`;
        marker.style.top = `${location.y}%`;
        marker.addEventListener('click', () => showLocationDetails(location));
        map.appendChild(marker);
    });
}

// Show location details
function showLocationDetails(location) {
    const detailsElement = document.getElementById('locationDetails');
    if (!detailsElement) return;
    
    document.getElementById('locationName').textContent = location.name;
    document.getElementById('visitDate').textContent = location.visitDate;
    document.getElementById('routeInfo').textContent = location.route;
    document.getElementById('expenses').textContent = location.expenses;
    
    detailsElement.style.display = 'block';
    
    // Scroll to details
    detailsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Setup interactions
function setupInteractions() {
    // Tab switching for plan page
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tab = this.getAttribute('data-tab');
            filterPlans(tab);
        });
    });
    
    // Profile menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            showNotification(`${text} feature coming soon!`);
        });
    });
    
    // Filter button
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            showNotification('Filter options coming soon!');
        });
    }
    
    // Add plan button
    const addPlanBtn = document.querySelector('.add-plan-btn');
    if (addPlanBtn) {
        addPlanBtn.addEventListener('click', () => {
            showNotification('Add new plan feature coming soon!');
        });
    }
    
    // Settings button
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showNotification('Settings feature coming soon!');
        });
    }
    
    // Map view button
    const mapViewBtn = document.querySelector('.map-view-btn');
    if (mapViewBtn) {
        mapViewBtn.addEventListener('click', () => {
            showNotification('Different map views coming soon!');
        });
    }
}

// Filter plans by status
function filterPlans(status) {
    const planList = document.getElementById('planList');
    if (!planList) return;
    
    planList.innerHTML = '';
    
    const filteredPlans = travelPlans.filter(plan => 
        status === 'upcoming' ? plan.status === 'upcoming' : plan.status === 'completed'
    );
    
    filteredPlans.forEach(plan => {
        const planElement = createPlanElement(plan);
        planList.appendChild(planElement);
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
}

// Format date range
function formatDateRange(startDate, endDate) {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Update stats periodically
setInterval(() => {
    const steps = document.getElementById('stepsCount');
    const distance = document.getElementById('distanceCount');
    const duration = document.getElementById('durationCount');
    
    if (steps) {
        const currentSteps = parseInt(steps.textContent.replace(/,|步/g, ''));
        const newSteps = currentSteps + Math.floor(Math.random() * 50);
        steps.innerHTML = `${newSteps.toLocaleString()} <span class="unit">步</span>`;
    }
    
    if (distance) {
        const currentDistance = parseFloat(distance.textContent);
        const newDistance = currentDistance + 0.1;
        distance.innerHTML = `${newDistance.toFixed(1)} <span class="unit">km</span>`;
    }
}, 30000); // Update every 30 seconds
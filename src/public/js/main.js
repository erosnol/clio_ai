// Main JavaScript for Educational Crypto History Timeline
// Main JavaScript for Crypto History Timeline

class TimelineManager {
    constructor() {
        this.events = [];
        this.filters = {
            categories: new Set(),
            timeRange: {
                from: null,
                to: null
            },
            significanceThreshold: 70,
            searchQuery: ''
        };
        
        this.initializeUI();
        this.attachEventListeners();
        this.loadEvents();
    }

    initializeUI() {
        // Initialize UI elements
        this.filterBtn = document.getElementById('filterBtn');
        this.filterPanel = document.getElementById('filterPanel');
        this.searchInput = document.getElementById('searchInput');
        this.timeline = document.getElementById('timeline');
        this.loading = document.getElementById('loading');
        this.significanceSlider = document.getElementById('significanceSlider');
        
        // Category colors
        this.categoryColors = {
            technical: 'bg-blue-100 text-blue-800',
            security: 'bg-red-100 text-red-800',
            regulatory: 'bg-yellow-100 text-yellow-800',
            market: 'bg-green-100 text-green-800',
            adoption: 'bg-purple-100 text-purple-800',
            general: 'bg-gray-100 text-gray-800'
        };
    }

    attachEventListeners() {
        // Toggle filter panel
        this.filterBtn.addEventListener('click', () => {
            this.filterPanel.classList.toggle('hidden');
        });

        // Search input
        this.searchInput.addEventListener('input', debounce(() => {
            this.filters.searchQuery = this.searchInput.value;
            this.updateTimeline();
        }, 300));

        // Category filters
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    this.filters.categories.add(checkbox.value);
                } else {
                    this.filters.categories.delete(checkbox.value);
                }
                this.updateTimeline();
            });
        });

        // Date range filters
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs[0].addEventListener('change', (e) => {
            this.filters.timeRange.from = e.target.value ? new Date(e.target.value) : null;
            this.updateTimeline();
        });
        dateInputs[1].addEventListener('change', (e) => {
            this.filters.timeRange.to = e.target.value ? new Date(e.target.value) : null;
            this.updateTimeline();
        });

        // Significance threshold
        this.significanceSlider.addEventListener('input', debounce((e) => {
            this.filters.significanceThreshold = parseInt(e.target.value);
            this.updateTimeline();
        }, 300));
    }

    async loadEvents() {
        try {
            this.loading.classList.remove('hidden');
            
            // Fetch events from our API
            const response = await fetch('/api/events');
            const data = await response.json();
            
            this.events = data.events;
            this.updateTimeline();
            
        } catch (error) {
            console.error('Error loading events:', error);
            // Show error state
            this.timeline.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-red-500">Error loading events. Please try again later.</p>
                </div>
            `;
        } finally {
            this.loading.classList.add('hidden');
        }
    }

    updateTimeline() {
        const filteredEvents = this.filterEvents();
        this.renderEvents(filteredEvents);
    }

    filterEvents() {
        return this.events.filter(event => {
            // Apply significance threshold
            if (event.significance.score < this.filters.significanceThreshold) {
                return false;
            }

            // Apply category filter
            if (this.filters.categories.size > 0 && 
                !event.categories.some(cat => this.filters.categories.has(cat))) {
                return false;
            }

            // Apply date range filter
            const eventDate = new Date(event.timestamp);
            if (this.filters.timeRange.from && eventDate < this.filters.timeRange.from) {
                return false;
            }
            if (this.filters.timeRange.to && eventDate > this.filters.timeRange.to) {
                return false;
            }

            // Apply search filter
            if (this.filters.searchQuery) {
                const searchLower = this.filters.searchQuery.toLowerCase();
                return event.content.toLowerCase().includes(searchLower) ||
                       event.categories.some(cat => cat.toLowerCase().includes(searchLower));
            }

            return true;
        });
    }

    renderEvents(events) {
        this.timeline.innerHTML = '';
        const template = document.getElementById('eventTemplate');

        events.forEach(event => {
            const eventElement = template.content.cloneNode(true);
            
            // Set category badge
            const categoryBadge = eventElement.querySelector('.category-badge');
            categoryBadge.textContent = event.primaryCategory;
            categoryBadge.className = `category-badge px-2 py-1 rounded text-sm font-medium ${
                this.categoryColors[event.primaryCategory] || this.categoryColors.general
            }`;

            // Set timestamp
            eventElement.querySelector('.timestamp').textContent = 
                new Date(event.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

            // Set content
            eventElement.querySelector('.event-title').textContent = 
                event.content.split('\n')[0]; // First line as title
            eventElement.querySelector('.event-content').textContent = 
                event.content.split('\n').slice(1).join('\n'); // Rest as content

            // Set significance score
            const scoreElement = eventElement.querySelector('.significance-score .score');
            scoreElement.textContent = `${event.significance.score}`;
            scoreElement.className = `score ${
                event.significance.score >= 90 ? 'text-green-600' :
                event.significance.score >= 70 ? 'text-blue-600' : 'text-gray-600'
            }`;

            // Add market metrics if available
            if (event.marketMetrics) {
                const metricsDiv = eventElement.querySelector('.market-metrics');
                metricsDiv.classList.remove('hidden');
                
                const formatChange = (change) => {
                    const prefix = change >= 0 ? '+' : '';
                    const colorClass = change >= 0 ? 'text-green-600' : 'text-red-600';
                    return `<span class="${colorClass}">${prefix}${change.toFixed(2)}%</span>`;
                };

                metricsDiv.querySelector('.price-change').innerHTML = 
                    formatChange(event.marketMetrics.btcPrice);
                metricsDiv.querySelector('.market-cap-change').innerHTML = 
                    formatChange(event.marketMetrics.btcMarketCap);
            }

            // Add cross references if available
            if (event.crossReferences && event.crossReferences.length > 0) {
                const refsDiv = eventElement.querySelector('.cross-references');
                const refsList = refsDiv.querySelector('.references-list');
                refsDiv.classList.remove('hidden');

                event.crossReferences.forEach(ref => {
                    const refLink = document.createElement('a');
                    refLink.href = ref.url;
                    refLink.target = '_blank';
                    refLink.className = 'block text-blue-600 hover:underline';
                    refLink.textContent = `@${ref.author}: ${ref.content.substring(0, 100)}...`;
                    refsList.appendChild(refLink);
                });
            }

            this.timeline.appendChild(eventElement);
        });

        // Show empty state if no events
        if (events.length === 0) {
            this.timeline.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500">No events found matching your criteria.</p>
                </div>
            `;
        }
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.timelineManager = new TimelineManager();
});

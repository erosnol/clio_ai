// Main JavaScript for Clio - The Muse of Crypto History
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            const cards = document.querySelectorAll('.timeline-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Learn More button functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('learn-more-btn')) {
            const card = e.target.closest('.timeline-card');
            const details = card.querySelector('.card-details');
            details.classList.toggle('expanded');
            e.target.textContent = details.classList.contains('expanded') ? 'Show Less' : 'Learn More';
        }
    });

    // Share button functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('share-btn') || e.target.closest('.share-btn')) {
            const card = e.target.closest('.timeline-card');
            const title = card.querySelector('.event-title').textContent;
            const description = card.querySelector('.event-description').textContent;
            
            // Create a shareable message
            const shareText = `Learning about "${title}" on Clio - The Muse of Crypto History!\n\n${description}`;
            
            // Use Web Share API if available
            if (navigator.share) {
                navigator.share({
                    title: 'Clio - The Muse of Crypto History',
                    text: shareText,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(shareText)
                    .then(() => {
                        const btn = e.target.closest('.share-btn');
                        const originalHTML = btn.innerHTML;
                        btn.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                        }, 2000);
                    })
                    .catch(console.error);
            }
        }
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-elements > div');
    floatingElements.forEach(element => {
        element.style.animationDelay = `${Math.random() * 2}s`;
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.timeline-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.event-title').textContent.toLowerCase();
            const description = card.querySelector('.event-description').textContent.toLowerCase();
            const keyTerms = Array.from(card.querySelectorAll('.key-terms-list dt'))
                .map(term => term.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) ||
                           keyTerms.some(term => term.includes(searchTerm));
            
            card.style.display = matches ? 'block' : 'none';
        });
    });
});

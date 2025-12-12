/* ========================================
   Animated Metrics Counter
   Counts up numbers when they come into view
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const metricValues = document.querySelectorAll('.metric-value, .stat-number');
    
    if (metricValues.length === 0) return;
    
    // Counter animation function
    function animateCounter(element) {
        const target = parseInt(element.dataset.target) || 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all metric elements
    metricValues.forEach(metric => {
        if (metric.dataset.target) {
            metric.textContent = '0';
            observer.observe(metric);
        }
    });
});

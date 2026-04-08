// --- Intersection Observer for Reveal Animations ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Hamburger
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.getElementById('nav-wrapper');
    if (hamburger && navWrapper) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navWrapper.classList.toggle('active');
        });

        // Close menu on link click
        navWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navWrapper.classList.remove('active');
            });
        });
    }

    // Initial Reveal
    document.querySelectorAll('.reveal, .fade-in').forEach(el => observer.observe(el));

    // Page Load Fade In
    document.body.classList.add('loaded');

    // Sticky Nav Logic
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // --- CMS Dynamic Content Loading ---
    loadDynamicContent();

    // Smooth Page Transitions
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname && !link.hash && !link.target && !link.href.includes('mailto:')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.href;
                document.body.classList.remove('loaded');
                setTimeout(() => {
                    window.location.href = target;
                }, 600);
            });
        }
    });

    // Stat Counter Animation (if present)
    const stats = document.querySelectorAll('.number');
    if (stats.length > 0) {
        animateStats(stats);
    }
});

async function loadDynamicContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();

        // Populate Team Photo (About Page)
        const teamPhoto = document.getElementById('team-photo');
        if (teamPhoto && data.primary_team_photo) {
            teamPhoto.src = data.primary_team_photo;
        }

        // Populate Gallery (Gallery Page)
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid && data.gallery) {
            galleryGrid.innerHTML = data.gallery.map((item, index) => `
                <div class="gallery-item reveal" style="transition-delay: ${index * 0.1}s;">
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="caption">
                        <h4>${item.title}</h4>
                        <p>${item.caption}</p>
                    </div>
                </div>
            `).join('');

            // Re-observe new elements for animations
            document.querySelectorAll('.gallery-item.reveal').forEach(el => observer.observe(el));
        }
    } catch (error) {
        console.error('Error loading CMS content:', error);
    }
}

function animateStats(stats) {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            stat.textContent = target > 300 ? value + '+' : value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                stat.textContent = target > 300 ? target + '+' : target;
            }
        };

        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                window.requestAnimationFrame(step);
                obs.unobserve(stat);
            }
        }, { threshold: 1 });
        obs.observe(stat);
    });
}

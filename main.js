import './style.css'

// Add simple parallax effect to hero cursor movement
document.addEventListener('mousemove', (e) => {
  const hero = document.getElementById('hero-section');
  if (!hero) return;
  const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
  hero.style.backgroundPosition = `calc(50% + ${xAxis}px) calc(50% + ${yAxis}px)`;
});

// Add vertical scroll parallax for the background watermark logo
window.addEventListener('scroll', () => {
  const watermark = document.querySelector('.hero-logo-watermark');
  if (watermark) {
    const scrollY = window.scrollY;
    // Parallax: moves down more subtly at 20% of the scroll speed
    // This creates the premium depth effect requested while keeping it readable
    watermark.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
  }
});

// Intersection Observer for elegant scroll reveal animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Uncomment to only fire animation once:
      // observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Global Page Transition Helper
window.transitionTo = function(href) {
  document.body.classList.add('page-transitioning');
  setTimeout(() => {
    window.location.href = href;
  }, 400); // Matches the 0.4s CSS transition
};

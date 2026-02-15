// 1. Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. SPOTLIGHT EFFECT (Architecture Vibe)
// Ye script mouse ki position legi aur CSS variable update karegi
const heroSection = document.getElementById('hero');
const spotlight = document.querySelector('.spotlight');

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        // Calculate X and Y inside the hero section
        const x = e.clientX;
        const y = e.clientY;
        
        // CSS Variable set karo
        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);
    });
}

// 3. GSAP Animations (Text Reveal)
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    // Tagline fade in
    tl.from(".tagline", { y: 20, opacity: 0, duration: 0.8 })
      // Title bada hoke chota hoga (Architectural reveal)
      .from(".main-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
      .from(".subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".btn-group", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
});

// Masonry Reveal
gsap.from(".masonry-item", {
    scrollTrigger: {
        trigger: ".masonry-container",
        start: "top 85%",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
});
// 1. Initialize Lenis (Smooth Scroll)
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

// 2. Custom Cursor (Desktop)
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Interactions
const interactiveElements = document.querySelectorAll('a, button, .panel');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = '#D4AF37';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
});

// 3. GSAP Animations (Hero & Parallax)
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.from(".main-title", { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".subtitle", { y: 20, opacity: 0, duration: 1 }, "-=0.5")
      .from(".btn-group", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8");
});

// Parallax Effect (Only Desktop)
if (window.innerWidth > 768) {
    gsap.to(".col-1", {
        y: -150,
        scrollTrigger: { trigger: ".gallery-section", start: "top bottom", end: "bottom top", scrub: 1 }
    });
    
    gsap.to(".col-2", {
        y: 100,
        scrollTrigger: { trigger: ".gallery-section", start: "top bottom", end: "bottom top", scrub: 1.5 }
    });
    
    gsap.to(".col-3", {
        y: -50,
        scrollTrigger: { trigger: ".gallery-section", start: "top bottom", end: "bottom top", scrub: 1 }
    });
}
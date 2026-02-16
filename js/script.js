const appUrl = 'https://fmqkvwnlptzhrjqltxay.supabase.co'; 
const appKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcWt2d25scHR6aHJqcWx0eGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNzEwNTMsImV4cCI6MjA4Njc0NzA1M30._3bbX7JSFH9TIGr5VihPlrOdgyItM0Ai4nspUPHXqAE'; 

// FIX: Variable name changed from 'supabase' to 'db' to avoid conflict
const db = window.supabase.createClient(appUrl, appKey);

// 2. FETCH GALLERY
async function fetchGallery() {
    const container = document.getElementById('gallery-grid');
    
    // FIX: Using 'db' instead of 'supabase'
    const { data: designs, error } = await db
        .from('ceiling_designs')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error:", error);
        if(container) container.innerHTML = '<p style="text-align:center; color:red;">Failed to load.</p>';
        return;
    }

    if (!designs || designs.length === 0) {
        if(container) container.innerHTML = '<p style="text-align:center; color:#888;">No designs yet.</p>';
        return;
    }

    if(container) container.innerHTML = '';

    designs.forEach(design => {
        const item = document.createElement('div');
        item.className = 'masonry-item';
        item.innerHTML = `
            <img src="${design.image_url}" alt="${design.title}" loading="lazy">
            <div class="overlay">
                <h3>${design.title}</h3>
                ${design.category ? `<p style="font-size:0.8rem; color:#D4AF37;">${design.category}</p>` : ''}
            </div>
        `;
        if(container) container.appendChild(item);
    });

    animateGallery();
}

// 3. ANIMATIONS
// Smooth Scroll
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAP
gsap.registerPlugin(ScrollTrigger);

function animateGallery() {
    gsap.from(".masonry-item", {
        scrollTrigger: { trigger: ".masonry-container", start: "top 85%" },
        y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out"
    });
}

// INIT
window.addEventListener('load', () => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.from(".tagline", { y: 20, opacity: 0, duration: 0.8 })
      .from(".main-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
      .from(".subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".btn-group", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

    fetchGallery();
});
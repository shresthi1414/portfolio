// Particle System for Interactive Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update(mouseX, mouseY) {
        // React to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.x += dx * 0.01;
            this.y += dy * 0.01;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 123, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Slide Animations
gsap.from("#hero .profile-image img", {
    duration: 1.5,
    scale: 0.5,
    opacity: 0,
    ease: "power2.out"
});
gsap.from("#hero .name", {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: "power2.out"
});
gsap.from("#hero .department, #hero .contact", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    delay: 1,
    ease: "power2.out"
});

// About Slide
gsap.from("#about .slide-image", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    },
    x: -100,
    opacity: 0

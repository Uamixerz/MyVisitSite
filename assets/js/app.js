// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// CANVAS BACKGROUND (твій улюблений фон)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let points = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 50; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,255,163,0.25)";

    points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll(
    ".hero, section, footer"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealEls.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});

/* ===== PORTFOLIO TILT ===== */

/* ===== CTA ATTENTION ===== */
let idleTimer;
function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        const cta = document.querySelector(".cta");
        if (cta) {
            cta.scrollIntoView({ behavior: "smooth" });
        }
    }, 45000); // 45 сек без дій
}

["mousemove","scroll","keydown","touchstart"]
    .forEach(e => window.addEventListener(e, resetIdle));

resetIdle();
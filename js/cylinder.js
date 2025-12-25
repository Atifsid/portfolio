const items = document.querySelectorAll(".cylinder-item");
const total = items.length;
let angle = 0;
let isPaused = false;

function getRadius() {
    const width = window.innerWidth;
    if (width <= 360) return 180;
    if (width <= 480) return 240;
    if (width <= 768) return 300;
    if (width <= 900) return 380;
    if (width <= 1200) return 480;
    return 600;
}

function initCylinder() {
    const radius = getRadius();
    items.forEach((item, i) => {
        const itemAngle = (360 / total) * i;
        item.style.transform =
            `rotateY(${itemAngle}deg) translateZ(${radius}px)`;

        const overlay = item.querySelector(".card-overlay");
        if (overlay) {
            overlay.querySelector("h3").textContent = item.dataset.title;
            overlay.querySelector("p").textContent = item.dataset.desc;
        }
    });
}

initCylinder();

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initCylinder();
    }, 150);
});

items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    item.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    item.addEventListener("touchstart", () => {
        isPaused = true;
    });

    item.addEventListener("touchend", () => {
        setTimeout(() => {
            isPaused = false;
        }, 2000);
    });
});

function animate() {
    if (!isPaused) {
        angle += 0.15;
        const cylinder = document.querySelector(".cylinder");
        if (cylinder) {
            cylinder.style.transform = `rotateY(${angle}deg)`;
        }
    }
    requestAnimationFrame(animate);
}

animate();

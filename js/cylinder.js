const items = document.querySelectorAll(".cylinder-item");
const total = items.length;
const radius = 600;
let angle = 0;
let isPaused = false;

items.forEach((item, i) => {
    const itemAngle = (360 / total) * i;
    item.style.transform =
        `rotateY(${itemAngle}deg) translateZ(${radius}px)`;

    item.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    item.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    const overlay = item.querySelector(".card-overlay");
    if (!overlay) return;

    overlay.querySelector("h3").textContent = item.dataset.title;
    overlay.querySelector("p").textContent = item.dataset.desc;
});

function animate() {
    if (!isPaused) {
        angle += 0.15;
        document.querySelector(".cylinder").style.transform =
            `rotateY(${angle}deg)`;
    }
    requestAnimationFrame(animate);
}

animate();

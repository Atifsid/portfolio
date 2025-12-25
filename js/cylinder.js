const items = document.querySelectorAll(".cylinder-item");
const total = items.length;
const radius = 600;
let angle = 0;

items.forEach((item, i) => {
    const itemAngle = (360 / total) * i;
    item.style.transform =
        `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
});

function animate() {
    angle += 0.15; // speed (lower = smoother)
    document.querySelector(".cylinder").style.transform =
        `rotateY(${angle}deg)`;
    requestAnimationFrame(animate);
}

animate();

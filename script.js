const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const heartPoints = [];

const HEART_SIZE = 10;  // Уменьшает или увеличивает сердце
const NUM_PARTICLES = 500; // Количество частиц
const SPEED = 0.05;  // Скорость движения частиц

// Функция для расчета координат сердца
function heartFunction(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    };
}

// Создание точек сердца
for (let t = 0; t < Math.PI * 2; t += 0.1) {
    let point = heartFunction(t);
    heartPoints.push({
        x: point.x * HEART_SIZE + canvas.width / 2,
        y: point.y * HEART_SIZE + canvas.height / 2
    });
}

// Класс частицы
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.target = heartPoints[Math.floor(Math.random() * heartPoints.length)];
        this.radius = Math.random() * 3 + 1;
        this.color = `rgba(255, ${Math.random() * 100 + 50}, ${Math.random() * 100 + 50}, 1)`;
    }

    update() {
        this.x += (this.target.x - this.x) * SPEED;
        this.y += (this.target.y - this.y) * SPEED;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Создание частиц
for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
}

// Анимация
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Обновление размеров canvas при изменении окна
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

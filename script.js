const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const heartPoints = [];
const textPoints = [];

const HEART_SIZE = 10;  // Размер сердца
const NUM_PARTICLES = 500; // Количество частиц
const SPEED = 0.05;  // Скорость движения частиц
const TEXT_DELAY = 3000; // Через сколько миллисекунд начнется переход к тексту

let showText = false; // Флаг для смены состояния

// Функция расчета координат сердца
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

// Функция для рендеринга текста в виде точек
function getTextPoints(text, x, y, fontSize) {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const points = [];

    for (let i = 0; i < canvas.width; i += 8) {
        for (let j = 0; j < canvas.height; j += 8) {
            let index = (j * canvas.width + i) * 4;
            if (imageData[index + 3] > 128) {
                points.push({ x: i, y: j });
            }
        }
    }

    return points;
}

// Создаем точки текста "Это тебе, родная"
setTimeout(() => {
    textPoints.push(...getTextPoints("Это тебе, родная", canvas.width / 3, canvas.height / 1.5, 40));
    showText = true;
}, TEXT_DELAY);

// Класс частицы
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.target = heartPoints[Math.floor(Math.random() * heartPoints.length)];
        this.radius = Math.random() * 3 + 1;
        this.color =});
}

// Функция для рендеринга текста в виде точек
function getTextPoint
    }

    update() {
        if (showText && textPoints.length > 0) {
            this.target = textPoints[Math.floor(Math.random() * textPoints.length)];
        }
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

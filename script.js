const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Переменные для отслеживания состояния рисования
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Настройки линии
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000'; // Черный цвет

// Функция начала рисования (когда пользователь нажимает кнопку мыши или прикосновение)
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(e);
}

// Функция рисования (когда пользователь двигает мышь или палец)
function draw(e) {
    if (!isDrawing) return;

    const [x, y] = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
}

// Функция завершения рисования (когда пользователь отпускает кнопку мыши или палец)
function stopDrawing() {
    isDrawing = false;
}

// Функция для получения координат (для мыши и сенсорных экранов)
function getCoordinates(e) {
    if (e.touches) { // Для мобильных устройств
        return [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    } else { // Для мыши
        return [e.offsetX, e.offsetY];
    }
}

// События для мыши
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing); // Если мышь покидает область канваса

// События для сенсорных экранов
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

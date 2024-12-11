const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const clearButton = document.querySelector("#submit_clear");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Переменные для отслеживания состояния рисования
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Настройки линии
let lineWidth = 5;
let currentColor = "#000000"; // Черный цвет

// Функция начала рисования (когда пользователь нажимает кнопку мыши или прикосновение)
function startDrawing(e) {
  isDrawing = true;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  [lastX, lastY] = getCoordinates(e);
}

// Функция завершения рисования (когда пользователь отпускает кнопку мыши или палец)
function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Функция рисования (когда пользователь двигает мышь или палец)
function draw(e) {

  document.getElementById("canvasX").value = "canvasX=" + e.offsetX;
  document.getElementById("canvasY").value = "canvasY=" + e.offsetY;

  if (!isDrawing) return;
  const [x, y] = getCoordinates(e);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);

  document.getElementById("pictX").value = "pictX=" + x;
  document.getElementById("pictY").value = "pictY=" + y;

  ctx.stroke();
  [lastX, lastY] = [x, y];
}

// Функция для получения координат (для мыши и сенсорных экранов)
function getCoordinates(e) {
  if (e.touches) {
    // Для мобильных устройств
    return [
      e.touches[0].clientX - canvas.offsetLeft,
      e.touches[0].clientY - canvas.offsetTop,
    ];
    // return [e.offsetX, e.offsetY];
  } else {
    // Для мыши
    return [e.offsetX, e.offsetY];
  }
}

function coordinate(e) {
  let x = e.clientX;
  let y = e.clientY;
  document.getElementById("X").value = "X=" + x;
  document.getElementById("Y").value = "Y=" + y;
  alert;
}

// События для мыши
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing); // Если мышь покидает область канваса

// События для сенсорных экранов
// canvas.addEventListener('touchstart', startDrawing);
// canvas.addEventListener('touchmove', draw);
// canvas.addEventListener('touchend', stopDrawing);
// canvas.addEventListener('touchcancel', stopDrawing);

document.onmousemove = coordinate;
clearButton.addEventListener("click", clearCanvas);

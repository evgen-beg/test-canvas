const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const clearButton = document.querySelector("#submit_clear");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

canvas.willReadFrequently = true;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height

// прямая, округлая,  кривая, прямоугольник
const tools = {
  straight: "s",
  vector: "v",
  curved: "c",
  rectangle: "r",
};

// Переменные для отслеживания состояния рисования
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let snapshot = null;

// Настройки линии
let lineWidth = 5;
let currentColor = "#000000"; // Черный цвет
let currentTool = null;
let prevX = null;
let prevY = null;

// Функция начала рисования (когда пользователь нажимает кнопку мыши или прикосновение)
function startDrawing(e) {
  isDrawing = true;
  [prevX, prevY] = getCoordinates(e);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  snapshot = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  [lastX, lastY] = getCoordinates(e);
}

// Функция завершения рисования (когда пользователь отпускает кнопку мыши или палец)
function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}









// Рисование прямой линии
function drawStraight(e) {
  // const [x, y] = getCoordinates(e);
  // ctx.lineCap = "butt";
  // ctx.lineJoin = "miter";
  // ctx.moveTo(lastX, lastY);  // Начало от предыдущей точки
  // ctx.lineTo(x, y);  // Прямая линия до текущей точки
  // ctx.stroke();
  // [lastX, lastY] = [x, y];
}

// Рисование округлой линии
function drawVector(e) {
  // const [x, y] = getCoordinates(e);
  // ctx.lineCap = "round";
  // ctx.lineJoin = "round";
  // ctx.moveTo(lastX, lastY);  // Начало от предыдущей точки
  // ctx.arcTo(lastX, lastY, x, y, 20);  // Используем arcTo для рисования округлой линии
  // ctx.stroke();
  // [lastX, lastY] = [x, y];
}

// рисование - кривая
function drawCurved(e) {
  const [x, y] = getCoordinates(e);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

// Рисование прямоугольника
function drawRectangle(e) {
  console.log('rectangle-2');
  ctx.putImageData(snapshot, 0, 0);
  ctx.strokeRect(prevX, prevY, e.offsetX - prevX, e.offsetY - prevY);
}

// Функция рисования (когда пользователь двигает мышь или палец)
function draw(e) {
  if (!isDrawing) return;
  document.getElementById("canvasX").value = "canvasX=" + lastX;
  document.getElementById("canvasY").value = "canvasY=" + lastY;
  const [x, y] = getCoordinates(e);
  document.getElementById("pictX").value = "pictX=" + x;
  document.getElementById("pictY").value = "pictY=" + y;
  switch (currentTool) {
    // прямая
    case tools.straight:
      drawStraight(e);
      break;
    // округлая
    case tools.vector:
      drawVector(e);
      break;
    // кривая
    case tools.curved:
      drawCurved(e);
      break;
    // квадрат
    case tools.rectangle:
      console.log('rectangle-1');
      drawRectangle(e);
      break;
  }
}

// Функция для получения координат (для мыши и сенсорных экранов)
function getCoordinates(e) {
  // getBoundingClientRect() для вычисления координат относительно окна.
  let rect = canvas.getBoundingClientRect();
  if (e.touches) {
    // Для мобильных устройств
    return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
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
}

// События для мыши
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing); // Если мышь покидает область канваса

// События для сенсорных экранов
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

document.onmousemove = coordinate;
clearButton.addEventListener("click", clearCanvas);

// ======================КНОПКИ======================
// ==================================================
const buttons = document.querySelectorAll("#btn1, #btn2, #btn3, #btn4");

function activateButton(button) {
  buttons.forEach(btn => btn.classList.remove("active"));  // Снимаем класс "active" со всех кнопок
  button.classList.add("active");  // Добавляем класс "active" на выбранную кнопку
}

// Добавляем обработчики событий на кнопки
buttons.forEach(button => {
  button.addEventListener("click", () => {
    activateButton(button);
    // Присваиваем инструмент в зависимости от id кнопки
    switch (button.id) {
      case "btn1":
        currentTool = tools.straight;
        break;
      case "btn2":
        currentTool = tools.vector;
        break;
      case "btn3":
        currentTool = tools.curved;
        break;
      case "btn4":
        currentTool = tools.rectangle;
        break;
    }
  });
});
// ==================================================


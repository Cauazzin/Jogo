const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let speed = 150;

// 🎮 Captura de teclas
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if ((key === "ArrowUp" || key === "w") && direction !== "DOWN") direction = "UP";
    if ((key === "ArrowDown" || key === "s") && direction !== "UP") direction = "DOWN";
    if ((key === "ArrowLeft" || key === "a") && direction !== "RIGHT") direction = "LEFT";
    if ((key === "ArrowRight" || key === "d") && direction !== "LEFT") direction = "RIGHT";
}

// 🎮 Movimentação da cobra
function moveSnake() {
    let head = { ...snake[0] };
    
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    snake.unshift(head);
    
    // 🍎 Se a cobra comer a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = "Pontos: " + score;
        food = generateFood();
        if (speed > 50) speed -= 5; // Aumenta a velocidade
    } else {
        snake.pop(); // Remove a última parte se não comer
    }

    checkCollision(head);
}

// ⚠️ Colisões com a parede ou o próprio corpo
function checkCollision(head) {
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        resetGame();
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// 🔄 Reinicia o jogo ao perder
function resetGame() {
    alert("Game Over! Sua pontuação: " + score);
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = generateFood();
    score = 0;
    speed = 150;
    document.getElementById("score").textContent = "Pontos: 0";
}

// 🍎 Gera comida em local aleatório
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

// 🎨 Renderiza o jogo
function drawGame() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    ctx.shadowColor = "#00ff00";
    ctx.shadowBlur = 10;
    
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
        if (index === 0) {
            ctx.fillStyle = "#ff0"; // Cabeça com cor diferente
        } else {
            ctx.fillStyle = "lime";
        }
    });

    ctx.fillStyle = "red";
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 10;
    ctx.fillRect(food.x, food.y, box, box);
}

// ⏳ Loop do jogo
function gameLoop() {
    moveSnake();
    drawGame();
    setTimeout(gameLoop, speed);
}

gameLoop();
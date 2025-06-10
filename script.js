const gameArea = document.getElementById('game-area');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const gameOverMessage = document.getElementById('game-over-message');
const finalScoreSpan = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let timeLeft = 60; // 60 segundos de jogo
let gameInterval;
let itemGenerationInterval;
let isGameRunning = false;

const itemTypes = ['plastic', 'paper', 'organic', 'glass'];

// Função para gerar um item aleatório
function createItem() {
    if (!isGameRunning) return;

    const item = document.createElement('div');
    const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    item.classList.add('item', randomType);
    item.dataset.type = 'sustentavel'; // Todos os itens são sustentáveis para este jogo

    // Posição aleatória dentro da área de jogo
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - 60; // Largura do item
    const maxY = gameAreaRect.height - 60; // Altura do item

    item.style.left = `${Math.random() * maxX}px`;
    item.style.top = `${Math.random() * maxY}px`;

    item.addEventListener('click', () => {
        if (isGameRunning) {
            item.classList.add('clicked'); // Adiciona classe para animação de desaparecimento
            score += 1;
            scoreSpan.textContent = score;
            // Remove o item do DOM após a animação
            item.addEventListener('transitionend', () => item.remove());
        }
    });

    gameArea.appendChild(item);
}

// Função para iniciar o temporizador
function startTimer() {
    timerSpan.textContent = timeLeft;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Função para iniciar a geração de itens
function startItemGeneration() {
    itemGenerationInterval = setInterval(createItem, 800); // Gera um item a cada 0.8 segundos
}

// Função para iniciar o jogo
function startGame() {
    score = 0;
    timeLeft = 60;
    scoreSpan.textContent = score;
    timerSpan.textContent = timeLeft;
    gameArea.innerHTML = ''; // Limpa a área de jogo
    gameOverMessage.classList.add('hidden'); // Esconde a mensagem de fim de jogo
    startButton.classList.add('hidden'); // Esconde o botão de iniciar
    isGameRunning = true;

    startTimer();
    startItemGeneration();
}

// Função para finalizar o jogo
function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearInterval(itemGenerationInterval);
    
    // Exibe a mensagem de fim de jogo
    finalScoreSpan.textContent = score;
    gameOverMessage.classList.remove('hidden');
    restartButton.classList.remove('hidden'); // Garante que o botão de reiniciar aparece
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Oculta o botão de reiniciar no início
restartButton.classList.add('hidden');
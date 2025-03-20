let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById("check").addEventListener("click", checkGuess);
document.getElementById("reset").addEventListener("click", resetGame);

function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);
    const message = document.getElementById("message");

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.innerText = "Digite um número válido entre 1 e 100!";
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        message.innerText = `Parabéns! Você acertou em ${attempts} tentativas!`;
    } else if (guess < secretNumber) {
        message.innerText = "Tente um número maior!";
    } else {
        message.innerText = "Tente um número menor!";
    }
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById("message").innerText = "";
    document.getElementById("guess").value = "";
}
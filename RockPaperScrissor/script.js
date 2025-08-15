// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary HTML elements
    const choices = document.querySelectorAll('.choice-button');
    const player1Hand = document.getElementById('player1-hand');
    const player2Hand = document.getElementById('player2-hand');
    const resultMessage = document.getElementById('result-message');
    const winsDisplay = document.querySelector('#wins-display span');
    const lossesDisplay = document.querySelector('#losses-display span');
    const drawsDisplay = document.querySelector('#draws-display span');
    const p1ScoreLabel = document.getElementById('p1-score-label');
    const p2ScoreLabel = document.getElementById('p2-score-label');
    const playAgainBtn = document.getElementById('play-again');
    const vsComputerBtn = document.getElementById('vs-computer-btn');
    const vsPlayerBtn = document.getElementById('vs-player-btn');

    // Game state variables
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let gameMode = 'vsComputer'; // Default mode
    let player1Choice = null;

    const options = ['rock', 'paper', 'scissors'];
    const handEmojis = {
        'rock': '✊',
        'paper': '✋',
        'scissors': '✌️'
    };

    // Main game logic function
    function playGame(playerChoice) {
        if (gameMode === 'vsComputer') {
            handleVsComputer(playerChoice);
        } else {
            handleVsPlayer(playerChoice);
        }
    }

    // Handles the game logic for single-player mode
    function handleVsComputer(playerChoice) {
        // Disable buttons and start animation
        choices.forEach(button => button.classList.add('disabled'));
        player1Hand.classList.add('shake-player');
        player2Hand.classList.add('shake-computer');
        resultMessage.textContent = 'Playing...';
        
        // Set a timeout to wait for the animation to finish
        setTimeout(() => {
            // Stop animation and re-enable buttons
            player1Hand.classList.remove('shake-player');
            player2Hand.classList.remove('shake-computer');
            choices.forEach(button => button.classList.remove('disabled'));

            // Get computer's choice
            const computerChoice = options[Math.floor(Math.random() * options.length)];

            // Update hands display
            player1Hand.textContent = handEmojis[playerChoice];
            player2Hand.textContent = handEmojis[computerChoice];

            // Determine the winner
            const result = determineWinner(playerChoice, computerChoice);
            updateScore(result);
            updateResultMessage(result);

        }, 800); // Duration of the shake animation
    }

    // Handles the game logic for two-player mode
    function handleVsPlayer(playerChoice) {
        if (!player1Choice) {
            // Player 1's turn
            player1Choice = playerChoice;
            resultMessage.textContent = 'Player 2\'s turn. Player 1, look away!';
            choices.forEach(button => button.classList.add('disabled'));

            // Temporarily hide Player 1's hand
            player1Hand.classList.add('hidden');
            
            // Re-enable buttons for Player 2
            setTimeout(() => {
                choices.forEach(button => button.classList.remove('disabled'));
            }, 500);

        } else {
            // Player 2's turn
            const player2Choice = playerChoice;
            choices.forEach(button => button.classList.add('disabled'));

            // Reveal Player 1's hand and start animation
            player1Hand.classList.remove('hidden');
            player1Hand.classList.add('shake-player');
            player2Hand.classList.add('shake-computer');
            resultMessage.textContent = 'Playing...';

            setTimeout(() => {
                // Stop animation
                player1Hand.classList.remove('shake-player');
                player2Hand.classList.remove('shake-computer');

                // Update hands display
                player1Hand.textContent = handEmojis[player1Choice];
                player2Hand.textContent = handEmojis[player2Choice];

                // Determine the winner
                const result = determineWinner(player1Choice, player2Choice);
                updateScore(result);
                updateResultMessage(result);
                
                // Reset player1Choice for next round
                player1Choice = null;

            }, 800);
        }
    }

    // Function to determine the winner
    function determineWinner(player1, player2) {
        if (player1 === player2) {
            return 'draw';
        }
        if (
            (player1 === 'rock' && player2 === 'scissors') ||
            (player1 === 'paper' && player2 === 'rock') ||
            (player1 === 'scissors' && player2 === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }

    // Function to update the score
    function updateScore(result) {
        if (result === 'win') {
            wins++;
            winsDisplay.textContent = wins;
        } else if (result === 'lose') {
            losses++;
            lossesDisplay.textContent = losses;
        } else {
            draws++;
            drawsDisplay.textContent = draws;
        }
    }

    // Function to update the result message
    function updateResultMessage(result) {
        resultMessage.classList.remove('win', 'lose', 'draw');
        if (result === 'win') {
            resultMessage.textContent = gameMode === 'vsComputer' ? 'Congrats, You Won!' : 'Player 1 Wins!';
            resultMessage.classList.add('win');
        } else if (result === 'lose') {
            resultMessage.textContent = gameMode === 'vsComputer' ? 'You Lost!' : 'Player 2 Wins!';
            resultMessage.classList.add('lose');
        } else {
            resultMessage.textContent = 'Oops! It\'s a Draw';
            resultMessage.classList.add('draw');
        }
    }

    // Event listeners for player choices
    choices.forEach(button => {
        button.addEventListener('click', () => {
            playGame(button.id);
        });
    });

    // Event listener for the "Play Again" button
    playAgainBtn.addEventListener('click', () => {
        // Reset hands and message for the next round
        player1Hand.textContent = '✊';
        player2Hand.textContent = '✊';
        resultMessage.textContent = 'Select your Weapon';
        resultMessage.classList.remove('win', 'lose', 'draw');
        choices.forEach(button => button.classList.remove('disabled'));
    });

    // Event listeners for mode selection buttons
    vsComputerBtn.addEventListener('click', () => {
        gameMode = 'vsComputer';
        vsComputerBtn.classList.add('active');
        vsPlayerBtn.classList.remove('active');
        p1ScoreLabel.textContent = 'Won:';
        p2ScoreLabel.textContent = 'Lost:';
        
        // Reset scores and hands
        wins = 0;
        losses = 0;
        draws = 0;
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        drawsDisplay.textContent = draws;
        player1Hand.classList.remove('hidden');
        player2Hand.textContent = '✊';
    });

    vsPlayerBtn.addEventListener('click', () => {
        gameMode = 'vsPlayer';
        vsPlayerBtn.classList.add('active');
        vsComputerBtn.classList.remove('active');
        p1ScoreLabel.textContent = 'P1 Won:';
        p2ScoreLabel.textContent = 'P2 Won:';

        // Reset scores and hands
        wins = 0;
        losses = 0;
        draws = 0;
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        drawsDisplay.textContent = draws;
    });
});

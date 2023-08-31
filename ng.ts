import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame(rounds: number): void {
  let score = 0;

  function playRound() {
    const targetNumber = generateRandomNumber(1, 100);
    let guesses = 0;

    function makeGuess() {
      rl.question('Enter your guess: ', (input) => {
        const guess = parseInt(input, 10);

        if (isNaN(guess)) {
          console.log('Please enter a valid number.');
          makeGuess();
        } else {
          guesses++;

          if (guess === targetNumber) {
            console.log(`Congratulations! You guessed the number in ${guesses} guesses.`);
            score++;
            if (score < rounds) {
              console.log(`Score: ${score}/${rounds}`);
              playRound();
            } else {
              console.log('Game Over. Your final score:', score);
              rl.close();
            }
          } else if (guess < targetNumber) {
            console.log('Try a higher number.');
            makeGuess();
          } else {
            console.log('Try a lower number.');
            makeGuess();
          }
        }
      });
    }

    console.log(`Round ${score + 1}/${rounds}`);
    makeGuess();
  }

  playRound();
}

rl.question('How many rounds do you want to play? ', (input) => {
  const rounds = parseInt(input, 10);

  if (isNaN(rounds) || rounds <= 0) {
    console.log('Please enter a valid number of rounds.');
    rl.close();
  } else {
    console.log(`Let's play Guess the Number for ${rounds} rounds!\n`);
    playGame(rounds);
  }
});

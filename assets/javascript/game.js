
//OBJECT
 //crate game object 
var game = {
  // number of guesses allowed
  guess: 10,
  // number of wins set to 0
  wins: 0,
  // Empty arrays to store guess and answer dashes
  answerArray: [],
  // list of random words
  randomWord:["car","bus","dog","sing","play","soccer","ball","park",
    "cat","shoe","house","mouse","bird","door","mom","dad","frog","horse","grass",
    "apple","banana","lemon","tree","belt","shirt","pants","jacket","kiosk","mall","toy","puppy","kitty", 
    "duck","drum","happy","sad","child","quick","down","slow","fast","jump",
    "run","walk","fall","tired","bark","yell","bad","good","papa","cool","hot",
    "sorry","quick","book","pen","pencil","wheel","plate","fork","spoon",
    "down","left","sock","smell","stink","rope","bed","you","low","high","sky","pet",
    "box","room","head","knee","toe","hand","arm","leg","nose","eyes","ears","finger","rain","sun","bug","fly",
    "frog","lake","ant"],
  //array of allowed keys to press
  alphabet:[  "a","b","c","d","e","f","g","h","i","j",
  "k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  randomNumber: 0,
  hiddenWord: "",
  lettersUsed: [],
  wSound: document.getElementById("win"),
  hint: [],
  hintCount:5,

  //OBJECT FUNCTIONS
  //==================================================================================================================
  // generates a random word form the randon word array
  startGame: function () {
    document.getElementById("message").innerHTML = " ";
    this.randomNumber = Math.floor(Math.random(this.randomWord) * this.randomWord.length),
      this.hiddenWord = this.randomWord[this.randomNumber];
    this.answerArray = [""]
    for (var i = 0; i < this.hiddenWord.length; i++) {
      this.answerArray[i] = "_";
    }
    document.getElementById("answer").innerHTML = this.answerArray.join(" ");
    this.guess = 10;
    document.getElementById("numofguess").innerHTML = this.guess + " guesses left";
    this.lettersUsed = [];
    document.getElementById("winner").innerHTML = "";
    document.getElementById("hint").disabled = false;
    
  },
  // Checks for invalid key characters pressed
  lettersAllowed: function (allowed) {
    // Iterate through alphabet
    for (var i = 0; i < this.alphabet.length; i++) {
      // Checks if input letter is contained in alphabet
      if (this.alphabet[i] === allowed) {
        return false;
      }
    }

    return true;
  },
  // //Checks for duplicate guesses and keeps guesses the same
  checkDuplicates: function (letter, letterArray) {
    // Iterate through lettersUsed
    for (var i = 0; i < letterArray.length; i++) {
      // Checks if letter is contained in lettersUsed
      if (letterArray[i].toLocaleUpperCase() === letter.toLocaleUpperCase()) {
        return true;
      }
    }

    return false;
  },

  // //sets a timer for a new game to start
  time: function () {
    document.getElementById("message").innerHTML = "New Game starting soon...";
    setTimeout(function () {
      game.startGame()
    }, 3000)
  },

  //   //play winning sound
  winSound: function () {
    game.wSound.play();
  },
  //If the user gives up this is the option to quit the game
  showAnswer: function () {
 (quit) {
      document.getElementById(
        "answer"
      ).innerHTML = t    var quit = confirm("Are you sure you want to quit?");
    ifhis.hiddenWord.toLocaleUpperCase();
      this.guess = 0;
      this.wins = 0;
      this.hintCount = 5;
      document.getElementById("numofguess").innerHTML = this.guess + " guesses left";
      document.getElementById("numofwins").innerHTML = "Wins " + this.wins;
      document.getElementById("numofhints").innerHTML = this.hintCount +
        " hints left";
      game.time();
    }
  },
  //gives one hint per game until hints are over
  showHint: function(){
    if (this.hintCount!==0){
    this.hint = this.hiddenWord.charAt(0);
    document.getElementById("match").innerHTML =
        "Try " + this.hint.toLocaleUpperCase();
    this.hintCount--;
    document.getElementById("hint").disabled = true;
    document.getElementById("numofhints").innerHTML = this.hintCount +
        " hints left";
    console.log(this.hintCount);
    } else if(this.hintCount===0){
      document.getElementById("match").innerHTML =
        "No more hints left";
    }
  }
};


//USER INTERACTION
//===================================================================================================
document.onkeyup = function (event) {
  var inputLetter = event.key;
  //iterate through hidden word to find matches and add them to the answer replacing the dashes.
  for (var j = 0; j < game.hiddenWord.length; j++) {
    if (game.hiddenWord[j] === inputLetter) {
      game.answerArray[j] = inputLetter.toUpperCase();
    }

    document.getElementById("answer").innerHTML = game.answerArray.join(" ");
  }

  //check if pressed key is valid letter character by calling lettersAllowed function
  if (game.lettersAllowed(inputLetter)) {
    document.getElementById("message").innerHTML = "Invalid key pressed";
  } else {
    //Check if inputLetter is in lettersUsed by calling the checkDuplicates and displays error
    if (game.checkDuplicates(inputLetter, game.lettersUsed)) {
      document.getElementById("message").innerHTML =
        inputLetter.toUpperCase() + " already used";
    } else {
      //if guess matches the hidden word letter found message
      if (game.hiddenWord.includes(inputLetter)) {
        document.getElementById("match").innerHTML =
          inputLetter.toUpperCase() + " " + "found!";
      } else {
        //if guess does not match the hidden word letter not found message and guess down by 1
        document.getElementById("match").innerHTML =
          inputLetter.toUpperCase() + " " + "Not found!";
        game.guess--;
        document.getElementById("numofguess").innerHTML =
          game.guess + " guesses left";

        //If guesses reaches 0 then the game is over and prompts for a new game
        if (game.guess === 0) {
          alert("GAME OVER the word was " + game.hiddenWord.toLocaleUpperCase());
          var again = confirm("Do you want to play again?");
          if (again) {
            location.reload();
          } else {
            alert("Thanks for playing");
            document.getElementById(
              "answer"
            ).innerHTML = game.hiddenWord.toLocaleUpperCase();
          };
        };
      };
      //Creates an array of letters used and displays them.
      game.lettersUsed.push(inputLetter.toUpperCase());
      document.getElementById("used").innerHTML = "Letters used " + game.lettersUsed;


      //End of Game if the answer matches the hidden user wins the game
      if (game.answerArray.join("") === game.hiddenWord.toLocaleUpperCase()) {
        game.wins++;
        document.getElementById("numofwins").innerHTML = "Win Streak " + game.wins;
        document.getElementById("winner").innerHTML = "YOU WIN";
        document.getElementById("used").innerHTML = " ";
        document.getElementById("match").innerHTML = " ";
        game.lettersUsed = [];
        game.winSound();
        game.time();
      }
    }
  }
};

//If the user gives up this is the option to quit the game
function showAnswer() {
  var quit = confirm("Are you sure you want to quit?");
  if (quit) {
    document.getElementById(
      "answer"
    ).innerHTML = game.hiddenWord.toLocaleUpperCase();
    game.guess = 0;
    game.wins = 0;
    document.getElementById("numofguess").innerHTML = game.guess + " guesses left";
    document.getElementById("numofwins").innerHTML = "Wins " + game.wins;
  }
}
//call function showAnswer
document.getElementById("showanswer").onclick = function () {
  game.showAnswer();
};
//call function showHint
document.getElementById("hint").onclick = function () {
  game.showHint();
};
  



    

//var userChoice;
//var correctAnswer = 0;
//var incorrectAnswer = 0;
//var unanswered = 0;
//var count = 10;
//var images;

var panel = $('#quiz-area');
var countStartNumber = 30;

// 10 Trivia Questions 
var triviaQuestion = [{
    question: "Who is the main character in Final Fantasy VII?",
    choices: ["Sephiroth", "Bo", "Tidus", "Cloud" ],
    images:  [],
    correctAnswer: "Cloud"
    
    }, {
    question:"What is AVALANCHE's headquarters located?",
    choices: ["7th Heaven", "Sector 6 Slums Church", "Shinra HQ", "Junon"],
    images:  [],
    correctAnswer: "7th Heaven"
    
    }, {
    question:"What is the name of the main character's childhood friend?",
    choices: ["Zell", "Barret", "Tifa", "Freya"],
    images:  [],
    correctAnswer: "Tifa"
    
    }, {
    question:"Which one is NOT one of the enemies you fight in the game?",
    choices: ["Emerald Weapon", "Sapphire Weapon", "Diamond Weapon ", "Yuffie"],
    images:  [],
    correctAnswer: "Sapphire Weapon"
    
    }, {
    question:"On the PS1, what disc do you fight the final boss?",
    choices: ["Disc 1", "Disc 2", "Disc 3", "Disc 4"],
    images:  [],
    correctAnswer: "Disc 3"
    
     }, {
    question:"The liquid form of the planet's life source is called...",
    choices: ["Materia", "Mako", "Nectar", "Elysian"],
    images:  [],
    correctAnswer: "Mako"
    
    }, {
    question:"What colored Chocobo can cross land, water, and mountains?",
    choices: ["Yellow", "Blue", "Gold", "White"],
    images:  [],
    validAnswer: "Gold"
    
    }, {
    question:"*SPOILER* (If you haven't played this game yet... all I can say is wow) Whose death impacted the game at the end of disc 1?",
    choices: ["Aeris", "Zack", "Cait Sith", "Tifa"],
    images:  [],
    correctAnswer: "Aeris"
    
    }, {
    question: "What is the name of the amusement park?",
    choices: ["Costa Del Sol", "Rocket Town", "Gold Saucer", "Sector 6 Arcade"],
    images:  [],
    correctAnswer: "Gold Saucer"
   
    }, {
    question: "What city does the game start off in?",
    choices: ["Nibelheim", "Junon", "Wutai", "Midgar"],
    images:  [],
    correctAnswer: "Midgar"
    
    
    }];

    // On Click functions 

    $(document).on('click', '#start-over', function(e) {
        game.reset();
      });
      
      $(document).on('click', '.answer-button', function(e) {
        game.clicked(e);
      });
      
      $(document).on('click', '#start', function(e) {
        $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
        game.loadQuestion();
      });


    
    var game = {
        questions:triviaQuestion,
        currentQuestion:0,
        counter:countStartNumber,
        correct:0,
        incorrect:0,
        countdown: function(){
        //Game counter decrimenting 
          game.counter--;
          $('#counter-number').html(game.counter);
      
          if (game.counter === 0){
            console.log('TIME UP');
            game.timeUp();
          }
        },
        loadQuestion: function(){
          timer = setInterval(game.countdown, 1000);
          panel.html('<h2>' + triviaQuestion[this.currentQuestion].question + '</h2>' );
          for (var i = 0; i< triviaQuestion[this.currentQuestion].choices.length; i++){
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + triviaQuestion[this.currentQuestion].choices[i] + '">' + triviaQuestion[this.currentQuestion].choices[i]+ '</button>');
          }
        },
        nextQuestion: function(){
          game.counter = countStartNumber;
          $('#counter-number').html(game.counter);
          game.currentQuestion++;
          game.loadQuestion();
        },
        timeUp: function (){
          clearInterval(timer);
          $('#counter-number').html(game.counter);
      
          panel.html('<h2>Out of Time!</h2>');
          panel.append('<h3>The Correct Answer was: ' + triviaQuestion[this.currentQuestion].correctAnswer);
          panel.append('<img src="' + triviaQuestion[this.currentQuestion].image + '" />');
      
          if (game.currentQuestion === triviaQuestion.length - 1){
            setTimeout(game.results, 3 * 1000);
          } else {
            setTimeout(game.nextQuestion, 3 * 1000);
          }
        },
        results: function() 
        {
            clearInterval(timer);

            panel.html('<h2>All done, heres how you did!</h2>');
            $('#counter-number').html(game.counter);
            panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
            panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
            panel.append('<h3>Unanswered: ' + (triviaQuestion.length - (game.incorrect + game.correct)) + '</h3>');
            panel.append('<br><button id="start-over">Start Over?</button>');
        },
    clicked: function(e) {
    clearIntepanelrval(timer);

    if ($(e.target).data("name") === triviaQuestion[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + triviaQuestion[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + triviaQuestion[game.currentQuestion].image + '" />');

    if (game.currentQuestion === triviaQuestion.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + triviaQuestion[game.currentQuestion].image + '" />');

    if (game.currentQuestion === triviaQuestion.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
    }

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var begin = 0;

// Keyboard Event
$(document).keydown(function() {
  if (begin === 0) {
    console.log(level);
    $("h1").text("Level " + level);
    nextSequence();
    begin++;
  }
});

//Click Event
$(".btn").click(function() {
  $(event.target).fadeIn(100).fadeOut(100).fadeIn(100);
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log("user:" + userClickedPattern);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checker(userChosenColor);

});

// checker
function checker() {
  var flag = 1;
  setTimeout(function() {
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        continue;
      } else {
        flag = 0;
        console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-Over, You reached level-" + level);
      }
    }
}, 10);
  setTimeout(function() {
    console.log(flag);
    if (flag === 1) {
        if (gamePattern.length === userClickedPattern.length) {
        console.log("true");
        setTimeout( function() {
            nextSequence();
        },1000);
      }
    }
}, 100);
}

// Color Generator
function nextSequence() {
  userClickedPattern = [];
  var randomnNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomnNumber];
  gamePattern.push(randomChosenColor);
  console.log("game:" + gamePattern);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

// Button Animation
function animatePress(currrentColor) {
  $("#" + currrentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currrentColor).removeClass("pressed");
  }, 100);
}

// Sound Generator
function makeSound(seqColor) {
  var audio = new Audio("sounds/" + seqColor + ".mp3");
  audio.play();
}
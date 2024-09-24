
// variables and arrays
var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red", "blue", "green", "yellow" ]
var level = 0
var compare = [userClickedPattern.length];



// next sequence function
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level++;
    $("#level-title").html("Level " +level);
    console.log(gamePattern)
}



// Load Game Event with timer
$(document).one("keydown",function loadGame(event){
    if(event.key === " "){
        
        setTimeout(function(){
            $("#level-title").html("3");
        } ,0)
    
        setTimeout(function(){
            $("#level-title").html("2");
        } ,1000)
    
        setTimeout(function(){
            $("#level-title").html("1");
        } ,2000)
        
        setTimeout(function(){
            nextSequence();
        } ,3000)
    }
});



// click event listener
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer([level - 1]);
});



// animate button clicks callback function
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100)
}



// check answer callback function
function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] && gamePattern[level] === userClickedPattern[level]){
        console.log("success")
        setTimeout(function(){
        nextSequence();
        }, 500)
        userClickedPattern.length = 0;
    } else if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
        console.log("Game Over!")
        $("body").addClass("game-over")
        var gameover = new Audio("sounds/wrong.mp3")
    .play(gameover);
    setTimeout(function(){
        startOver();
    }, 2000)

    setTimeout(function(){
        nextSequence();
    }, 3000)
    


    }
}



// sound callback function
function playSound(input){
    var sound = new Audio("sounds/"+input+".mp3")
    .play(sound);
}

// start over call back function
function startOver(){
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    $("body").removeClass("game-over")
}

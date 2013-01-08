$(function() {

  var num_cards = 5,
  guess_limit = 20,
  num_guesses = 0, 
  correct_guesses = 0;


  $("#guess_limit").html(guess_limit);
  nextCard();

  
  $(".btn").click(function() {

    num_guesses++;
    $("#guesses").html(num_guesses);

    if($(this).attr("name") == "yes") {
      correct_guesses++;
    } else if ($(this).attr("name") == "start") {
      start();
    }

    if(num_guesses == guess_limit) {
      finish();
      return;
    }

    nextCard();
  });

  function nextCard() {

    $(".glyph").hide();
    var random = Math.floor((Math.random() * 6));
    $(".glyph:eq("+ random + ")").toggle();
  }

  function start() {
    $("#howto").hide();
    $("#game").show();
  }

  function finish() {
    var score = calculateScore(num_guesses, correct_guesses);
    $(".glyph").hide();
    $(".buttons").hide();

    $('#score span').html(score);
      // $('#score').show();

      if(score > 3) {
        $("#high").show();
      } else if (score > 2.58) {
        $("#medium").show();
      } else {
        $("#low").show();
      }
    }

    function calculateScore(num_guesses, correct_guesses) {
      var odds = 1/num_cards;
      console.log(odds);

      var avg_score = (num_guesses * odds);
      console.log(avg_score);
      var denom = (odds * (1 - odds)) * num_guesses;
      console.log(denom);
      console.log((correct_guesses - avg_score) / Math.sqrt(denom));
      return (correct_guesses - avg_score) / Math.sqrt(denom);
    }

  });
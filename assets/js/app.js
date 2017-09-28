// Tof dat je de code wilt bekijken.
// Niet kopieëren aub :)

var words = ["fiets", "bus", "hoelaat", "blub"];
var stopped = 0;
var guesses = 0;
var rounds = 1;
var answer;
var rand;
reset();

function reset() {
  stopped = 0;
  guesses = 0;
  $("ul").empty();
  rand = words[Math.floor(Math.random() * words.length)];
  setWord(rand);
  resetcounter();
  updaterounds();
  $("#newgame").hide();
}
$('input').keydown(function(e) {
  e.preventDefault();
  return false;
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function setWord(e) {
  getList(e);
  document.getElementById("examplesearch").value = e;
}

function getList(e) {
  $.ajax({
    url: "http://suggestqueries.google.com/complete/search?client=firefox&q=" + e,
    type: 'GET',
    dataType: 'jsonp',
    success: function(s) {
      addList(s);
    },
    error: function(e) {
      console.log('something went wrong!', e)
    }
  });
}

function addList(e) {
  e.shift();
  answer = e[0][0];
  for (var i = 0; i < e.length; i++) {
    var rnd = shuffle(e[i]);
    for (var p in e[i]) {
      $('#suggestions').append("<li value='" + e[i][p] + "'>" + e[i][p] + "</li");
    }
  }
}

$("#suggestions").on('click', 'li', function() {
  if (stopped == 0) {
    if ($(this).hasClass("false")) {
      return false;
    }
    if ($(this).text().toUpperCase() == answer.toUpperCase()) {
      $(this).addClass("true");
      stopped = 1;
      updatecounter();
      stopgame();
    } else {
      updatecounter();
      $(this).addClass("false");
    }
  } else {
    alert("Game is finished, please click \"New Game\"!");
  }
});

function stopgame() {
  reset();
}

function updatecounter() {
  guesses += 1;
  document.getElementById("guess").innerHTML = guesses;
}

function resetcounter() {
  guesses = 0;
  document.getElementById("guess").innerHTML = guesses;
}

function updaterounds() {
  rounds += 1;
  document.getElementById("rounds").innerHTML = rounds;
}
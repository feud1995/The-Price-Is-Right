
$(document).ready(function() {
  
 setTimeout(function() {
    $('#overlay').fadeOut(4000);
  }, 1000);
  
  setTimeout(function() {
    $('#yt').remove();
  }, 6000);
  
  var $carousel = $('#carousel');
	var firstSpin, secondSpin = false;
  var score = 0;
  var timer;
  
  $('.disabled').click(function(e) {
    e.preventDefault();
  })
  
  $('.spin').click(function() {
    if ($(this).hasClass('disabled')) {
      alert("No more spins buddy");
      return false;
    }
    if (timer) {
      alert("Let the total update before you try to spin again");
			return false;
    }
    if (!firstSpin) {
      firstSpin = true;
      timer = true;
      
      var landed = spin($carousel);
    	score = parseInt($('figure:nth-child('+landed+')').text());
    } else if (firstSpin && !secondSpin) {
      secondSpin = true;
      timer = true;
      
      var landed = spin($carousel);
    	score += parseInt($('figure:nth-child('+landed+')').text());
      secondSpin = true;
      $('.spin').addClass('disabled');
    }
    
    if(timer) {
      setTimeout(function() {
        $('#total').text(score);
        timer = false;
      }, 5000)  
    }
    
  });
});
// Returns a random number between min (inclusive) and max (exclusive)
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function spin($carousel) {
  //var power = Math.round(getRandom(1,5));
  var first;
  if ($carousel.attr('data-first')) {
    first = parseInt($carousel.attr('data-first'));
  } else {
    first = 0;
  }
  var current = $carousel.attr('data-current');
  var landsOn = Math.round(getRandom(1,20));
  var rotate = (landsOn * 18) + 360 + first;
  $carousel.css({
    'transform': 'translateZ( -631.375151468px ) rotateX(-'+ rotate + 'deg)'
  });  
  $('#rotate').text(rotate);

  var landed = (rotate/18) + 1;

  while (landed > 20) {
    landed = landed - 20;
  }

  $carousel.attr('data-first', rotate);
  
  return landed;
}
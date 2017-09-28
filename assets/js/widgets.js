! function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    p = /^http:/.test(d.location) ? 'http' : 'https';
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);
  }
}(document, 'script', 'twitter-wjs');
$(function() {
  if (localStorage) {
    if (!localStorage.getItem('visited')) {
      $('.aside').show();
    } else {
      $('.aside').hide();
    }
  } else {
    $('.aside').show();
  }
});

function hidebar() {
  $(".aside").hide("fast");
  localStorage.setItem('visited', true);
  return false;
}
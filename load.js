(function() {
  var j = document.createElement('script');
  j.type = 'text/javascript';
  j.onload = function() {
    jackInit();
  };
  j.async = true;
  j.src = 'https://cdn.rawgit.com/lemontv/pxls/master/jack.js';
  var elem = document.querySelector('script');
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(j, s);
})();

window.jackInit = function () {
  window.jack = new Jack('https://raw.githubusercontent.com/lemontv/pxls/master/public/jack.json');
  jack.autofill();
}

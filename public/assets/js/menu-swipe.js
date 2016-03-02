(function() {

  var mainPanel = document.getElementById('mainPanel');
  var sidePanel = document.getElementById('sidePanel');
  var menu = document.getElementById('menu_button');
  var close = document.getElementById('close_button');

  var hammerPanel = new Hammer(mainPanel);
  var hammerSide = new Hammer(sidePanel);

  /* Navegador Mobile */
  // hammerPanel.on('swipeleft', onSwipeTimeline);
  hammerPanel.on('swiperight', onSwipe);
  hammerSide.on('swipeleft', onSwipe);

  /* Navegador Desktop */
  menu.addEventListener('click', onSwipe);
  close.addEventListener('click', onSwipe);


  function onSwipe() {
    sidePanel.classList.toggle('open');
  }

}());

(function() {

  var mainPanel = document.getElementById('mainPanel');
  var sidePanel = document.getElementById('sidePanel');
  var menu = document.getElementById('menu_button');
  var close = document.getElementById('close_button');
  var timeline = document.getElementById('timelinePanel');

  var hammerPanel = new Hammer(mainPanel);
  var hammerSide = new Hammer(sidePanel);
  var hammerTimeline = new Hammer(timeline);

  /* Navegador Mobile */
  hammerPanel.on('swiperight', onSwipe);
  hammerPanel.on('swipeleft', onSwipeTimeline);
  hammerTimeline.on('swiperight', onSwipeTimeline);
  hammerSide.on('swipeleft', onSwipe);

  /* Navegador Desktop */
  // mainPanel.addEventListener('click', onSwipe);
  menu.addEventListener('click', onSwipe);
  close.addEventListener('click', onSwipe);
  // timeline.addEventListener('click', onSwipeTimeline);


  function onSwipe() {
    sidePanel.classList.toggle('open');
  }
  function onSwipeTimeline(){
    timeline.classList.toggle('timeline_open');
  }

}());

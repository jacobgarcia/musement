(function() {

  var timeline = document.getElementById('timelinePanel');
  var mainPanel = document.getElementById('mainPanel');
  var rowRightTimeline = document.getElementById('timeline_right');
  var rowLeftTimeline = document.getElementById('timeline_left');

  var hammerPanel = new Hammer(mainPanel);
  var hammerTimeline = new Hammer(timeline);

  /* Navegador Mobile */
  hammerPanel.on('swipeleft', onSwipeTimeline);
  hammerTimeline.on('swiperight', onSwipeTimeline);

  /* Navegador Desktop */
  // mainPanel.addEventListener('click', onSwipe);

  rowLeftTimeline.addEventListener('click', onSwipeTimeline);
  rowRightTimeline.addEventListener('click', onSwipeTimeline);

  function onSwipeTimeline(){
    timeline.classList.toggle('timeline_open');
  }

}());

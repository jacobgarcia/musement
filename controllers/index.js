const express = require('express'),
      i18n = require('i18n-2');

//===================================== ROUTES =================================
module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('index.html', {
      what: req.i18n.__('What'),
      what2: req.i18n.__('What 2'),
      email: req.i18n.__('Email'),
      learn: req.i18n.__('Learn'),
      build: req.i18n.__('Build'),
      idea: req.i18n.__('Idea'),
      world: req.i18n.__('World Of Passion'),
      second: req.i18n.__('Second Header'),
      feedback: req.i18n.__('Second Header Text'),
      sharing: req.i18n.__('Sharing'),
      improving: req.i18n.__('Improving'),
      share: req.i18n.__('Share'),
      improve: req.i18n.__('Improve'),
      post: req.i18n.__('Post'),
      community: req.i18n.__('Community'),
      leaders: req.i18n.__('Leaders'),
      people: req.i18n.__('Key People'),
      slack: req.i18n.__('Slack'),
      slackin: req.i18n.__('Slackin'),
      afternoon: req.i18n.__('Afternoon'),
      coworking: req.i18n.__('Coworking'),
      date: req.i18n.__('Date'),
      place: req.i18n.__('Place'),
      after: req.i18n.__('After'),
      countdown: req.i18n.__('Countdown'),
      contact: req.i18n.__('Contact'),
      mail: req.i18n.__('Mail'),
      send: req.i18n.__('Send'),
      join: req.i18n.__('Join'),
      participate: req.i18n.__('Participate'),
      community: req.i18n.__('Community'),
      events: req.i18n.__('Events'),
      contribute: req.i18n.__('Contribute'),
      apply: req.i18n.__('Apply'),
      application: req.i18n.__('Application'),
      moment: req.i18n.__('Moment'),
      momentdescription: req.i18n.__('Moment Description'),
      time: req.i18n.__('Time'),
      communitynav: req.i18n.__('Community nav'),
      events: req.i18n.__('Events'),
      improve: req.i18n.__('Improve'),
      works: req.i18n.__('Works')
    });
  });

  app.get('/api/user/locale', function(req, res) {
    if (req.i18n.locale === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json({
          locale: req.i18n.locale
        });
      }
});
};

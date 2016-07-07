const express = require('express'),
      api = require("./api"); //API Routers

//===================================== ROUTES =================================
module.exports = function(app) {
  app.use('/api', api);
  
  });
};

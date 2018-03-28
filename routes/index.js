
// var scrape = require('../scripts/siteScrape');

// bringing in headlines and notes from controller

var headlineControl = require('./controllers/headlines');
var noteController = require('./controllers/notes');

module.exports = function(router) {

  //Home Route. Lander.
  router.get("/", function(req, res) {
    res.send("Hello world");
  });

  // Retrieve articles from the database.
  router.get("/all", function(req, res) {
    db.scrapedData.find({}, function(error, dbArticles) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(dbArticles);
      }
    });
  });

}



module.exports = routes;

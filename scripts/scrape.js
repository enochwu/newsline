var request = require("request");
var cheerio = require("cheerio");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  request("http://bgindependentmedia.org/", function(error, response, html) {
    var $ = cheerio.load(html);

    //Target element with title and link
    $(".entry-title").each(function(i, element) {

      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      if (title && link) {
        db.scrapedData.insert({
          title: title,
          link: link
        },
        function(err, articleData) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            console.log(articleData);
          }
        });
      }
    });
  });

  res.send("Scrape Complete");
});


module.exports = siteScrape;

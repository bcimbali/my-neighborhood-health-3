var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
  getArticles: function(req, res) {
    axios.get("https://www.npr.org/sections/environment/").then(response => {
      let $ = cheerio.load(response.data);

      let results = [];
      $("a", ".title").each(function(i, element) {
        results.push({
          title: $(element).text(),
          link: $(element).attr("href")
        });
      });
      res.json(results);
    });
  }
};

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  getArticles(req, res) {
    axios.get('https://www.npr.org/sections/environment/').then(response => {
      const $ = cheerio.load(response.data);

      const results = [];
      $('a', '.title').each(function(i, element) {
        results.push({
          title: $(element).text(),
          link: $(element).attr('href')
        });
      });
      res.json(results);
    });
  }
};

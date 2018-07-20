var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
    getArticles: function (req, res) {
        axios
            .get("https://www.npr.org/sections/environment/")
            .then(response => 
                 {
                let $ = cheerio.load(response.data);
              
                let results = [];
                $("a", ".title").each(function (i, element) {
                    results.push({
                        title: $(element).text(),
                        link: $(element).attr("href")
                    });
                    
                });
                res.json(results);
                
            });
    }
}

// // Parses our HTML and helps us find elements
// var cheerio = require("cheerio");
// // Makes HTTP request for HTML page
// var request = require("request");

// module.exports = {

//     getArticles: function (res) {
//         // Making a request articles. The page's HTML is passed as the callback's third argument
//         request("https://www.npr.org/sections/environment/", function (error, response, html) {

//             // Load the HTML into cheerio and save it to a variable
//             // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//             var $ = cheerio.load(html);

//             // An empty array to save the data that we'll scrape
//             var results = [];
//             $("h2.title").each(function (i, element) {

//                 var title = $(element).text();

//                 // In the currently selected element, look at its child elements (i.e., its a-tags),
//                 // then save the values for any "href" attributes that the child elements may have
//                 var link = $(element).children().attr("href");

//                 // Save these results in an object that we'll push into the results array we defined earlier
//                 results.push({
//                     title: title,
//                     link: link
//                 });
//             });
//             res(html);

//         });
//     }
// }
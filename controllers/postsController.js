const db = require("../models")

module.exports = {
    findAll: function(req, res) {
        console.log("in the find all")
        res.json({name: "karen"})
      },
}

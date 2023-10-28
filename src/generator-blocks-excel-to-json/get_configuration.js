const fs = require("fs");

module.exports.conf = JSON.parse(
  fs.readFileSync("./../../config/generator-blocks-excel-to-json.json", "utf8")
);

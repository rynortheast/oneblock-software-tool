const XLSX = require("xlsx");
const fs = require("fs");

const { conf } = require("./get_configuration.js");
const { catch_error } = require("./catch_error.js");

module.exports.SaveJsonToFile = (JSON_CONFIG_MINES) => {
  let path_with_name_file = null;

  if (conf["path-folder-for-result"])
    path_with_name_file = conf["path-folder-for-result"];
  else path_with_name_file = "./../result";

  if (conf["name-result-file"])
    path_with_name_file += `/${conf["name-result-file"]}.json`;
  else
    path_with_name_file += `/result__${new Date()
      .toJSON()
      .slice(0, 19)
      .replace(/:/g, "-")
      .replace(/T/g, "__")}.json`;

  fs.writeFile(path_with_name_file, JSON_CONFIG_MINES, (err) => {
    if (!err) console.log("JSON data saved to file:", path_with_name_file);
    else catch_error(100, err);
  });
};

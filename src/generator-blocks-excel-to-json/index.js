const { transfer_excel_to_json } = require("./transfer_excel_to_json.js");
const { save_json_to_file } = require("./save_json_to_file.js");
const { conf } = require("./get_configuration.js");

if (conf["path-xlsx-file"]) {
  const DATA = transfer_excel_to_json(conf["path-xlsx-file"]);
  save_json_to_file(DATA);
} else {
  console.log("Path to EXCEL file is not specified");
}

const { transfer_excel_to_json } = require("./transfer_excel_to_json.js");
const { save_json_to_file } = require("./save_json_to_file.js");
const { catch_error } = require("./catch_error.js");
const { conf } = require("./get_configuration.js");

if (conf["path-xlsx-file"] && conf["path-xlsx-file"].length > 5) {
  if (
    conf["path-xlsx-file"].includes(".xlsx", conf["path-xlsx-file"].length - 6)
  ) {
    const DATA = transfer_excel_to_json(conf["path-xlsx-file"]);
    save_json_to_file(DATA);
  } else {
    catch_error(2);
  }
} else {
  catch_error(5);
}

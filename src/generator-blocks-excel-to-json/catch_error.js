module.exports.catch_error = (code, err) => {
  if (code === 1)
    console.log("ERROR < 1 > There are no pages in the Excel file");
  else if (code === 100)
    console.log("ERROR < 100 > Error saving JSON file: " + err);
  process.exit(1);
};

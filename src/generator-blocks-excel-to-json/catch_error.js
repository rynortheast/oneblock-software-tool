module.exports.catch_error = (code, aux) => {
  if (code === 1)
    console.log("ERROR < 1 > There are no pages in the Excel file");
  else if (code === 2)
    console.log("ERROR < 2 > This is not an excel file with xlsx extension");
  else if (code === 3)
    console.log("ERROR < 3 > There are no mines in the excel file");
  else if (code === 4)
    console.log("ERROR < 4 > Not enough basic information for mine #" + aux);
  else if (code === 100)
    console.log("ERROR < 100 > Error saving JSON file: " + aux);
  process.exit(1);
};

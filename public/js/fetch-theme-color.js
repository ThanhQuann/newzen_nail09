const fs = require("fs");
// read theme color from _data/site.json
fs.readFile("./data/theme.json", "utf8", function (err, dataFile) {
  if (err) {
    console.log(err);
    return;
  }

  // parse file to JSON so that the variables can be accessed
  dataFile = JSON.parse(dataFile);

  // TODO: Check if dataFile.primary_theme_color is set
  // Open variables.scss and search/replace "$theme: ..." with color from data file
  fs.readFile(
    "./assets/style/_variables.scss",
    "utf-8",
    function (err, scssFile) {
      if (err) {
        console.log(err);
        return;
      }

      var replaced = scssFile;

      // Change the variables to whatever was set in the data file
      if (dataFile.color_primary) {
        const replacementString = dataFile.color_primary;
        replaced = replaced.replace(
          /\--color-primary: .*/g,
          "--color-primary: " + replacementString + ";"
        );
      }
      if (dataFile.color_anchor) {
        const replacementString = dataFile.color_anchor;
        replaced = replaced.replace(
          /\--color-anchor: .*/g,
          "--color-anchor: " + replacementString + ";"
        );
      }
      if (dataFile.color_main_blog) {
        const replacementString = dataFile.color_main_blog;
        replaced = replaced.replace(
          /\--color-main-blog: .*/g,
          "--color-main-blog: " + replacementString + ";"
        );
      }
      if (dataFile.color_text_blog) {
        const replacementString = dataFile.color_text_blog;
        replaced = replaced.replace(
          /\--color-text-blog: .*/g,
          "--color-text-blog: " + replacementString + ";"
        );
      }
      if (dataFile.color_white) {
        const replacementString = dataFile.color_white;
        replaced = replaced.replace(
          /\--color-white: .*/g,
          "--color-white: " + replacementString + ";"
        );
      }

      // Write result back to variables.scss
      fs.writeFile(
        "./assets/style/_variables.scss",
        replaced,
        "utf-8",
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
});

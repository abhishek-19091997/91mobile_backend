const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(fileUpload());

app.post("/", (req, res) => {
  // use modules such as express-fileupload, Multer, Busboy

  const fileName = Date.now() + "_" + req.files.file.name;
  const file = req.files.file;
  let uploadPath = __dirname + "/uploads/" + fileName;
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.send(err);
    }
  });
  console.log(req.files);
  res.send(200);
});
app.get("/", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      // files.forEach((file) => {
      //   console.log(file);

      // });
      res.send(files);
    }
  });
});
app.delete("/", (req, res) => {
  const { name } = req.query;
  console.log(name);
  const location = path.join(__dirname, "uploads", name);
  fs.unlink(location, (err) => {
    if (err) {
      throw err;
    }
    console.log("Delete File successfully.");
  });
  res.send("Deleted Sucessfully");
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});

require("dotenv").config();
var express = require("express");
var app = new express();
var port = 3900;
const mongoose = require("mongoose");
const uri = process.env.uri;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");


// require cors
const cors = require("cors");

// apply it as middleware
app.use(cors()); 

app.use(express.json());
mongoose
  .connect(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// auth routes
app.use("/auth", authRoute);

// routes for user data
app.use("/users", userRoute);

// routes for post data
app.use("/posts", postRoute);
// routes for post categories
app.use("/categories", categoryRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


//route for the backend port 
app.listen(port, function () {
  console.log("backend is running", port);
});

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const qr = require("qrcode");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");
const cheerio = require("cheerio");
const { writeFile } = require("fs").promises;
const cors = require('cors');
const http = require('http');
const ChatEngine  = require('chat-engine');
const socketIo = require("socket.io");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: "secret",resave: true,saveUninitialized: true,}));

// chat appliacation logic //
const users = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle user login
  socket.on("login", (username) => {
    users[socket.id] = username;
    io.emit("updateUsers", Object.values(users));
  });

  // Handle incoming messages
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", { username: users[socket.id], message });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("updateUsers", Object.values(users));
  });
});

//Set up Multer for handling file uploads //
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle image upload //

app.post("/", upload.single("imageUpload"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(404).send("No file uploaded");
  }

  //save the file //
  const fileName = `image_${Date.now()}.png`;
  const filePath = path.join(__dirname, "public", fileName);

  // save the file //
  fs.writeFileSync(filePath, file.buffer);
  res.status(200).send("File uploaded succesfuly");
});

// here we will create a route for chatapp // 
app.get('/chatApp',(req,res) =>{
  res.render('chatApp')
});

app.get("/iamges", (req, res) => {
  const images = fs.readdirSync(path.join(__dirname, "public"));

  // send the list image url //
  const imageUrls = images.map((image) => `/public/${image}`);
  res.json(imageUrls);
});

// // here we will connect the mongoDB to database //
mongoose
  .connect("mongodb://localhost:27017/chatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log(" MongoDB is connected sucessfully ");
  })
  .catch((error) => {
    console.error("errror connecting to Mongodb", error.message);
  });




// app.use(bodyParser.json());

// ...



// Define a user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

// ...

// Register a new user
app.post('/api/register', express.json(), async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Create a new user
        await User.create({ username, password });
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Login a user
app.post('/api/login', express.json(), async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username and password match
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        res.status(200).json({ message: 'Login successful', user: { username } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// ...

// here we will start the scrapping of instagram //

app.get("/scrape", async (req, res) => {
  try {
    const profileLink = req.query.profileLink;
    const profileData = await scrapeInstagramProfile(profileLink);
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function scrapeInstagramProfile(profileLink) {
  try {
    const response = await axios.get(profileLink);
    const $ = cheerio.load(response.data);

    const profilePicture = $('meta[property="og:image"]').attr("content");
    const bio = $('meta[property="og:description"]').attr("content");

    // Scrape photos
    const photoUrls = [];
    $("article img").each((index, element) => {
      const photoUrl = $(element).attr("src") || $(element).attr("data-src");
      if (photoUrl && !photoUrls.includes(photoUrl)) {
        photoUrls.push(photoUrl);
      }
    });

    // Scrape reels
    const reelUrls = [];
    $("article video").each((index, element) => {
      const reelUrl = $(element).attr("src") || $(element).attr("data-src");
      if (reelUrl && !reelUrls.includes(reelUrl)) {
        reelUrls.push(reelUrl);
      }
    });

    return {
      profilePicture,
      bio,
      photos: photoUrls,
      reels: reelUrls,
    };
  } catch (error) {
    throw error;
  }
}
 


app.get("/downloadReel", async (req, res) => {
  const reelUrl = req.query.url;

  try {
    // Download the Instagram reel content
    const response = await axios.get(reelUrl);

    // Save the content to a file (for demonstration purposes)
    const fileName = "downloaded_reel.mp4";

    // Use 'writeFile' function properly
    await writeFile(fileName, response.data, "binary");

    console.log("File written successfully:", fileName);

    const success = true;
    res.json({ success, fileName });
  } catch (error) {
    console.error("Error downloading reel:", error);
    const success = false;
    res.json({ success, error: error.message });
  }
});

// here we will verify the token //

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  jwt.verify(token, "secret-key", (err, decode) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    req.user = decode;
    next();
  });
};

// qr generator code //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// QR code generation route
app.get("/generate", async (req, res) => {
  const content = req.query.q || req.body.q;

  try {
    if (content !== undefined) {
      const qrCode = await qr.toDataURL(content);
      res.json({ url: qrCode });
    } else {
      res.status(400).json({ error: "Invalid Content" });
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

//Nodemailer configurations //
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  authMethod: "PLAIN",
  auth: {
    user: "abhi747043@gmail.com",
    pass: "lvam oovn nmpl mtpp",
  },
});

app.post("/submit-form", (req, res) => {
  const { name, email, message } = req.body;

  // // validate the form //
  // if(!name || !email || !message) {
  //   return res.status(404).json({sucess:false,message:'please all the details then submit'})
  // }

  const mailOptions = {
    from: "abhi747043@gmail.com",
    to: "vermabhishek327@gmail.com",
    subject: "Hi Abhishek Someone is Intrested in your profile",
    text: `Name: ${name}\nEmail:${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Unable to send the email");
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send("Email has been sent or we can say thankyou for submissions");
    }
  });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/", indexRouter);
app.use("/portfolio-one", usersRouter);



const urlDatabase = {};

app.post("/shorten", (req, res) => {
  const { originalUrl } = req.body;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortUrl = generateShortUrl();
  console.log("url is this:", shortUrl);
  const fullShortUrl = `${req.protocol}://${req.get("host")}/${shortUrl}`;
  urlDatabase[shortUrl] = originalUrl;

  res.json({ shortUrl: fullShortUrl, urlDatabase: urlDatabase });
});

app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;

  if (urlDatabase[shortUrl]) {
    res.redirect(urlDatabase[shortUrl]);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

// to catch error //
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function generateShortUrl() {
  return shortId.generate();
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});





module.exports = app;

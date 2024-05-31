// index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// MongoDB connection URI
const MONGODB_URI = 
  "mongodb+srv://cdbcdb:Ravali12@cluster0.vmedk.mongodb.net/GoFundEase";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define a schema and a model (Example: User schema)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  photo: Object,
  Address: String,
  idea: String,
  description: String,
  industryType: String,
  budget: String,
  availableFunds: String,
  fundsNeeded: String,
});
// const InvestorSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   contact: String,
//   photo: Object,
//   Address: String,
//   investmentBudget: String,
//   preferredIndustry: String,
// });

const User = mongoose.model("User", UserSchema);
// const Investor = mongoose.model("Investor", InvestorSchema);

//Users

// Example API endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/ideas/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Example API endpoint to add a new user
app.post("/adduser", async (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    contact,
    photo,
    Address,
    idea,
    description,
    budget,
    industryType,
    availableFunds,
    fundsNeeded,
  } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      contact,
      photo,
      Address,
      idea,
      description,
      budget,
      industryType,
      availableFunds,
      fundsNeeded,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Investor

// app.get("/investors", async (req, res) => {
//   try {
//     const investors = await Investor.find();
//     res.json(investors);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Example API endpoint to add a new user
// app.post("/addinvestor", async (req, res) => {
//   console.log(req.body);
//   const {
//     name,
//     email,
//     contact,
//     photo,
//     Address,
//     investmentBudget,
//     preferredIndustry,
//   } = req.body;

//   try {
//     const newInvestor = new Investor({
//       name,
//       email,
//       contact,
//       photo,
//       Address,
//       investmentBudget,
//       preferredIndustry,
//     });
//     await newInvestor.save();
//     res.status(201).json(newInvestor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

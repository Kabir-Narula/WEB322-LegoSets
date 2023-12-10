require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: String,
  email: String,
  loginHistory: [{ dateTime: Date, userAgent: String }],
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Initialize the database connection
module.exports.initialize = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

module.exports.registerUser = async (userData) => {
  if (userData.password !== userData.password2) {
    throw new Error("Passwords do not match");
  }

  try {
    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      userName: userData.userName,
      password: hashedPassword, // Store the hashed password
      email: userData.email,
      loginHistory: [],
    });

    await newUser.save();
    console.log("User registered:", newUser.userName);
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("User Name already taken");
    } else {
      throw new Error("There was an error encrypting the password: " + error);
    }
  }
};

module.exports.checkUser = async (userData) => {
  try {
    const user = await User.findOne({ userName: userData.userName });

    if (!user) {
      throw new Error("Unable to find user: " + userData.userName);
    }

    // Compare the user's entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(userData.password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect Password for user: " + userData.userName);
    }

    // Rest of your code for updating login history
    user.loginHistory.push({
      dateTime: new Date().toString(),
      userAgent: userData.userAgent,
    });

    if (user.loginHistory.length > 8) {
      user.loginHistory.shift(); // Keeping only the last 8 entries
    }

    await user.save();
    console.log("User login history updated for:", user.userName);
    return user;
  } catch (error) {
    throw error;
  }
};

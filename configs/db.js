const { default: mongoose } = require("mongoose");

const connecttoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect("mongodb://localhost:27017/auth-project");
      console.log("connected to database successfully");
    }
  } catch (err) {
    console.err("database Error: ", err);
  }
};

export default connecttoDB;

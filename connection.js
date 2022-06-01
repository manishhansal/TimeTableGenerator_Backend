const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://Timetable:${process.env.DB_PW}@cluster0.mgnrv.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database is connected");
  }
);

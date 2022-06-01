const express = require("express");
const Timetable = require("./Models/timeTable");
require("./connection");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  const table = await Timetable.find();
  res.json(table);
});

function validate(data, room, instructor, time) {
  function checkTimeAgain(t1, t2) {
    let r1 = "";
    let r2 = "";

    for (let i = 0; i < t1.length; i++) {
      if (t1[i] != ":") {
        r1 += t1[i];
      }
    }

    for (let j = 0; j < t2.length; j++) {
      if (t2[j] != ":") {
        r2 += t2[j];
      }
    }

    return +r1 <= +r2 ? true : false;
  }

  function checkTime(time1, time2) {
    let arr1 = time1.split(" ");
    let arr2 = time2.split(" ");

    if (arr1[0] === arr2[0]) {
      if (checkTimeAgain(arr1[3], arr2[1])) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].instructor === instructor) {
      if (!checkTime(data[i].meetingTiming, time)) {
        //If professor is same and timing is same
        return false;
      }
    } else {
      if (!checkTime(data[i].meetingTiming, time) && data[i].room === room) {
        //If professor is different and timing is same.
        //If professor is different, timing is same and class is same.
        return false;
      }
    }
  }
  return true;
}

app.post("/timeTable", async (req, res) => {
  const data = await Timetable.find();
  console.log(
    req.body.class,
    req.body.department,
    req.body.course,
    req.body.room,
    req.body.instructor,
    req.body.meetingTiming
  );
  var count;
  if (data[data.length - 1] === undefined) {
    count = -1;
  } else {
    count = Number(data[data.length - 1].class);
  }

  if (
    count <= 5 &&
    validate(data, req.body.room, req.body.instructor, req.body.meetingTiming)
  ) {
    await Timetable.create({
      class: count + 1,
      department: req.body.department,
      course: req.body.course,
      room: req.body.room,
      instructor: req.body.instructor,
      meetingTiming: req.body.meetingTiming,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

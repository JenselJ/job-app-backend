const port = process.env.PORT || 5000;
const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const path = "./data.json";
const fss = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

let content;

try {
  content = fss.readFileSync(`data.json`, "utf-8");
  console.log(content);
} catch (error) {
  console.error(error);
}

let jobsArray = JSON.parse(content);
console.log(jobsArray);

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

// app.get("/outfit", (req,res) => {
//   const tops = ["Black", "White", "Orange", "Navy"];
//   const jeans = ["Grey", "Dark Grey", "Black", "Navy"];
//   const shoes = ["White", "Grey", "Black"];

//   res.json({
//     top: _.sample(tops),
//     jeans: _.sample(jeans),
//     shoes: _.sample(shoes)

//   })
// })

// app.get("/comments/:id", async (req, res) => {
//   const id = req.params.id;
//   let content;

//   try {
//     content = await fs.readFile(`data/comments/${id}.txt`, "utf-8")
//   } catch {
//     res.sendStatus(404);
//   }

//   res.json({
//     content: content
//   });

// })

// app.post("/comments", async (req, res) => {
//   const id = uuid();
//   const content = req.body.content;

//   if(!content) {
//     return res.sendStatus(400);
//   }

//   await fs.mkdir("data/comments", { recursive: true });
//   await fs.writeFile(`data/comments/${id}.txt`, content)

//   res.status(201).json({
//     id: id
//   });
// })

app.post("/jobs", async (req, res) => {
  const id = uuid();
  const job = req.body.job;
  const description = req.body.description;
  const email = req.body.email;
  const userId = req.body.userId;
  const salary = req.body.salary;
  const salaryUnit = req.body.salaryUnit;
  const contactEmail = req.body.contactEmail;
  const companyName = req.body.companyName;
  jobsArray.push({
    job: job,
    description: description,
    id: id,
    email: email,
    userId: userId,
    salary: salary,
    salaryUnit: salaryUnit,
    contactEmail: contactEmail,
    companyName: companyName,
    comments: [],
  });
  fs.writeFile("data.json", JSON.stringify(jobsArray), (err) => {
    if (err) throw err;
    console.log("done writing...");
  });
  console.log(jobsArray);
  res.status(200).json({
    message: "done writing...",
  });
});

app.post("/comments", async (req, res) => {
  const commentsId = uuid();
  const id = req.body.id;
  const email = req.body.email;
  const userId = req.body.userId;
  const comment = req.body.comment;
  const username = req.body.username;
  jobsArray.forEach((job) => {
    if (id === job.id) {
      job.comments.push({
        comment: comment,
        id: commentsId,
        email: email,
        userId: userId,
        username: username,
      });
    }
  });
  console.log(jobsArray);
  jobsArray.forEach((job) => {
    console.log(job.comments);
  });
  fs.writeFile("data.json", JSON.stringify(jobsArray), (err) => {
    if (err) throw err;
    console.log("done writing...");
  });
  res.status(200).json({
    message: "okay",
  });
});

app.post("/deletecomment", async (req, res) => {
  const id = req.body.id;
  jobsArray.forEach((job) => {
    job.comments = job.comments.filter((comment) => comment.id !== id);
  });
  console.log(jobsArray);
  jobsArray.forEach((job) => {
    console.log(job.comments);
  });
  fs.writeFile("data.json", JSON.stringify(jobsArray), (err) => {
    if (err) throw err;
    console.log("done writing...");
  });
  res.status(200).json({
    message: id,
  });
});

app.post("/deletejob", async (req, res) => {
  const id = req.body.id;
  jobsArray = jobsArray.filter((job) => job.id !== id);
  console.log(jobsArray);
  fs.writeFile("data.json", JSON.stringify(jobsArray), (err) => {
    if (err) throw err;
    console.log("done writing...");
  });
  res.status(200).json({
    message: id,
  });
});

// app.get("/jobs", async (req,res) => {

//   await fs.readFile('./data.json', 'utf-8', (error, data) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     console.log(JSON.parse(data))
//   })
//   let content = this.JSON.parse(data)
//   console.log(content)
//   res.json({
//     content: content
//   })
// })

app.get("/jobs", async (req, res) => {
  try {
    res.json({
      content: jobsArray,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/", function (req, res) {
  res.send("working!");
});

app.listen(port, () => console.log("API Server is running..."));

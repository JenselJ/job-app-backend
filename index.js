const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const path = require('path');
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors())

let jobsArray = [

]

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
  jobsArray.push({job: job, description: description, id: id, comments: []})
  console.log(jobsArray)
  res.status(200).json({
    message: "okay"
  })
})

app.post("/comments", async (req, res) => {
  const commentsId = uuid();
  const id = req.body.id;
  const comment = req.body.comment
  jobsArray.map(job => {
    if (id === job.id) {
      job.comments.push({comment: comment, id: commentsId})
      return job.comments
    } else {
      return "no id match"
    }
  })
  console.log(jobsArray)
  console.log(jobsArray[0].comments)
  res.status(200).json({
    message: "okay"
  })
})

app.get("/jobs", (req,res) => {
  let content = jobsArray;
  console.log(content)
  res.json({
    content: content
  })
})

app.listen(4200, () => console.log("API Server is running..."));
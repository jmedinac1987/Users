"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const fileUtilities = require("./utilities/FileUtilities");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let data = fileUtilities.readJsonData();
  return res.status(data.Status).json(data);
});

app.post("/add", (req, res) => {
  let data = fileUtilities.writeJsonData(req.body);
  return res.status(data.Status).json(data);
});

app.delete('/delete/:id', (req, res)=>{
  let data = fileUtilities.deleteJsonData(req.params.id);
  return res.status(data.Status).json(data);
});

//TODO: Pending include the path to update a record

app.listen(port, () => {
  console.log(`App started on port ${port} 😎`);
});

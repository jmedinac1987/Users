"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const userController = require("./controller/UserController");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let data = userController.getUsers();
  return res.status(data.Status).json(data);
});

app.get("/:id", (req, res) => {
  let data = userController.getUser(req.params.id);
  return res.status(data.Status).json(data);
});

app.post("/add", (req, res) => {
  let data = userController.addUser(req.body);
  return res.status(data.Status).json(data);
});

app.delete("/delete/:id", (req, res) => {
  let data = userController.deleteUser(req.params.id);
  return res.status(data.Status).json(data);
});

app.put("/update/:id", (req, res) => {  
  let data = userController.updateUser(req.params.id,req.body);  
  return res.status(data.Status).json(data);
});

app.listen(port, () => {
  console.log(`App started on port ${port} 😎`);
});

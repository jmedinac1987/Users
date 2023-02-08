"use strict";

const fs = require("fs");
const uuid = require("uuid");
const path = "src/database/data-example.json";

let file = fs.readFileSync(path, "utf-8");
let data = JSON.parse(file);

function getUsers() {
  return { Status: 200, Response: data };
}

function getUser(id) {
  try {
    if (!data.some((user) => user.id == id))
      return { Status: 400, Response: "Username does not exist 😒" };

    let user = data.filter((user) => user.id == id);

    return { Status: 200, Response: user };
  } catch (err) {
    console.error(err);
    return {
      Status: 500,
      Response: "An error occurred obtaining the requested information 🥺",
    };
  }
}

function addUser(bodyRequest) {
  try {
    let { User, Password, Role, App, Environment, Url } = bodyRequest;

    if (
      !User ||
      !Password ||
      !Role ||
      !App ||
      !Environment ||
      !Url ||
      User.trim() == "" ||
      Password.trim() == "" ||
      Role.trim() == "" ||
      App.trim() == "" ||
      Environment.trim() == "" ||
      Url.trim() == ""
    ) {
      return { Status: 400, Response: "Full information not provided 😒" };
    }

    let newUser = {
      id: uuid.v4(),
      User,
      Password,
      Role,
      App,
      Environment,
      Url,
    };

    data.push(newUser);
    const usersJson = JSON.stringify(data);
    fs.writeFileSync(path, usersJson, "utf-8");
    return { Status: 200, Response: "User inserted successfully! 😎" };
  } catch (err) {
    console.error(err);
    return {
      Status: 500,
      Response: "An error has occurred during the user insertion process 🥺",
    };
  }
}

function deleteUser(id) {
  try {
    if (!data.some((user) => user.id == id))
      return { Status: 400, Response: "Username does not exist 😒" };

    data = data.filter((user) => user.id != id);
    const usersJson = JSON.stringify(data);

    fs.writeFileSync(path, usersJson, "utf-8");

    return { Status: 200, Response: "User was deleted successfully! 😎" };
  } catch (err) {
    console.error(err);
    return {
      Status: 500,
      Response: "An error occurred during the deletion process 🥺",
    };
  }
}

function updateUser(id, updateInformation) {
  try {
    if (Object.keys(updateInformation).length == 0)
      return { Status: 400, Response: "You have not provided information 😒" };

    let { User, Password, Role, App, Environment, Url } = updateInformation;

    if (
      !User ||
      !Password ||
      !Role ||
      !App ||
      !Environment ||
      !Url ||
      User.trim() == "" ||
      Password.trim() == "" ||
      Role.trim() == "" ||
      App.trim() == "" ||
      Environment.trim() == "" ||
      Url.trim() == ""
    ) {
      return { Status: 400, Response: "Full information not provided 😒" };
    }

    if (!data.some((user) => user.id == id))
      return { Status: 400, Response: "Username does not exist 😒" };

    let user = data.filter((user) => user.id == id);

    user.forEach((user) => {
      user.User = User;
      user.Password = Password;
      user.Role = Role;
      user.App = App;
      user.Environment = Environment;
      user.Url = Url;
    });

    data = data.filter((user) => user.id != id);
    data.push(user[0]);

    const usersJson = JSON.stringify(data);

    fs.writeFileSync(path, usersJson, "utf-8");

    return { Status: 200, Response: "User was updated successfully! 😎" };
  } catch (err) {
    console.error(err);
    return {
      Status: 500,
      Response: "An error occurred during the update process 🥺",
    };
  }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};

const fs = require("fs");
const uuid = require("uuid");
const path = "src/database/data.json";

let file = fs.readFileSync(path, "utf-8");
let data = JSON.parse(file);

function readJsonData() {
  return { Status: 200, Response: data };
}

function writeJsonData(bodyRequest) {
  try {
    let { User, Password, Role, App, Environment } = bodyRequest;

    if (!User || !Password || !Role || !App || !Environment) {
      return { Status: 400, Response: "Full information not provided 😒" };
    }

    let newUser = {
      id: uuid.v4(),
      User,
      Password,
      Role,
      App,
      Environment,
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

function deleteJsonData(id) {
  try {
    if(!data.some((user) => user.id == id)){
      return { Status: 400, Response: "Username does not exist 😒" };
    }
    data = data.filter((user) => user.id != id);
    const usersJson = JSON.stringify(data);
    fs.writeFileSync(path, usersJson, "utf-8");
    return { Status: 200, Response: "User was deleted successfully! 😎" };
  } catch (error) {}
}

//TODO: Pending include the function to update a record

module.exports = {
  readJsonData,
  writeJsonData,
  deleteJsonData,
};

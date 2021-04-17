const fs = require('fs');
const users = require('../data/users.json');
const usersPath = './data/users.json';

const finduser = (id) => {
  return users.find(u => u.id == id);
}

const updateUsersFile = (data, filePath, res, successCode, successMsg, errCode, errMsg) => {
  try {
    fs.writeFileSync(filePath, data);
    return res.status(successCode).json(successMsg);
  }
  catch (err) {
    console.log(err)
    return res.status(errCode).json(errMsg);
  }
}

const userNotFound = (res) => {
  return res.status(404).send("User not found.");
}


const usersController = {
  getAllUsers(req, res) {
    return res.status(200).send(users);
  },
  getUserById(req, res) {
    const { id } = req.params;
    const user = finduser(id);
    if (user) {
      return res.status(200).send(user);
    }
    else {
      return userNotFound(res);
    }
  },
  addUser(req, res) {
    const { id } = req.body;
    if (id.trim().length == 9) { //Id must be 9 charachters
      if (!finduser(id)) {
        const user = { id: id, cash: 0, credit: 0 };
        users.push(user);
        return updateUsersFile(JSON.stringify(users), usersPath, res, 201, "User added successfully",
          500, "Internal error, please try again");
      }
      else return res.status(400).send("Invalid request. User exsits");
    }
    else return res.status(400).send("Invalid request. Please provide a valid id. Id should contain 9 charachters");
  },
  deposit(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount && !isNaN(amount) && amount > 0) {
      const user = finduser(id);
      if (user) {
        user.cash += amount;
        return updateUsersFile(JSON.stringify(users), usersPath, res, 200, "Deposit was successful",
          500, "Internal error, please try again");
      }
      else { return userNotFound(res); }
    }
    else {
      return res.status(400).send("Invalid request. Please provide amount to deposit that is a valid positive number");
    }
  },
  setcredit(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount && !isNaN(amount) && amount >= 0) {//TODO:ampount=0
      const user = finduser(id);
      if (user) {
        user.credit = amount;
        return updateUsersFile(JSON.stringify(users), usersPath, res, 200, "Setting credit was successful",
          500, "Setting credit failed");
      }
      else return userNotFound(res);
    }
    else return res.status(400).send("Invalid request. Please provide amount that is a valid positive number");
  },
  withdraw(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount && !isNaN(amount) && amount > 0) {
      const user = finduser(id);
      if (user) {
        if (user.cash + user.credit >= amount) {//TODO: when useres array is updated but write failed
          user.cash -= amount;
          return updateUsersFile(JSON.stringify(users), usersPath, res, 200, "Success withdraw", 500, "Withdraw failed");
        }
        else return res.status(403).send("Withdraw failed. Insufficient funds.");
      }
      else return userNotFound(res);
    }
    else return res.status(400).send("Invalid request. Please provide amount to deposit that is a valid positive number");
  },
  transfer(req, res) {
    const fromUserId = req.params.id;//user id to transfer frunds from
    const amount = req.body.amount;//amount to transfer
    const toUserId = req.body.id; //user id to transfer funds too
    if (amount > 0 && toUserId) {
      const fromUser = finduser(fromUserId);
      const toUser = finduser(toUserId);
      if (fromUser && toUser) {
        if (fromUser.cash + fromUser.credit >= amount) {//TODO: when useres array is updated but write failed
          fromUser.cash -= amount;
          toUser.cash += amount;
          return updateUsersFile(JSON.stringify(users), usersPath, res, 200, "Success transfer", 500, "Transfer failed");
        }
        else return res.status(403).send("Transfer failed. Insufficient funds.");
      }
      else return userNotFound(res);
    }
    else return res.status(400).send("Invalid request. Please provide amount to transfer that is a valid positive number and a user id to transfer funds too.");
  }
}

module.exports = usersController;
const express = require("express");
const Sequelize = require("sequelize");
const app = express();

app.use(express.json());

//Connect to the database
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/morel");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been set succesfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the DB", +err);
  });

// User table
const User = sequelize.define(
  "user",
  {
    //Attributes
    firstName: { type: Sequelize.STRING, allowNull: false },

    lastName: { type: Sequelize.STRING, allowNull: false },
  },
  {
    //Options
  }
);

// Add a new user to the DB
app.post("/user", (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.save();
    res.json({ user: newUser }); //Return the new user create in the data base
  } catch (error) {
    console.error(error);
  }
});
User.sync({ force: true });
app.get("/", (req, res) => res.json({ message: "Hello" }));

const port = 3000;

app.listen(port, () => console.log(`App is running on port ${port}`));

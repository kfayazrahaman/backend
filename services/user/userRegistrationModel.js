import Sequelize from "sequelize";

const userRegistration = new Sequelize("registration", {
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userLogin = new Sequelize("login", {
  email: {
    type: String,
    allowNull: false,
  },
  token: {
    type: String,
  },
  login: {
    type: Boolean,
  },
  logout: {
    type: Boolean,
  },
});

export { userRegistration, userLogin };

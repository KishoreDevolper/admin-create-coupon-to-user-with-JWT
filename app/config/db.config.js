module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1234",
    DB: "role",
    dialect: "mysql",
    pool: {
      max: 500,
      min: 10,
      acquire: 30000,
      idle: 10000
    }
  }; 
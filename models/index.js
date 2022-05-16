const config = require("../app/config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases:0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.user = require("../models/usermodel")(sequelize, Sequelize);

db.role = require("../models/rolemodel")(sequelize, Sequelize);

db.coupons=require("../models/coupons")(sequelize,Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId" 
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasMany(db.coupons,{
  foreignKey:"CreatedTo",
  as:"coupons"
})
 
db.coupons.belongsTo(db.user,{
  foreignKey:"CreatedTo",
  as:"users"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db; 
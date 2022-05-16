module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("Coupons", {
      
        Coupons: {
            type: DataTypes.STRING
        },
       
    })

    return User

}
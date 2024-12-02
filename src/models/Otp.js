const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Otps = sequelize.define("Otp", {
    email:{
        type:DataTypes.STRING,
        lowercase:true,
        allowNull: true
    },
    otp:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
    },
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps:true
});

module.exports = Otps;
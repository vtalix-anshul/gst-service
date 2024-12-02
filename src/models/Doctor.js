const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Doctors = sequelize.define('Doctor', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    main_specialization:{
        type: DataTypes.STRING,
        allowNull:false,
        lowercase:true
    },
    expertise:{
        type:DataTypes.JSON,
        allowNull:false,
        defaultValue:[]
    },
    experience:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull: { msg: "Please enter experience in years"}
        }
    },
    clinic_address_complete:{
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notNull: { msg: "please enter the complete address of the clinic" }
        }
    },
    clinic_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "please enter the phone number of the clinic" }
        }
    },
    registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "please enter the registration/license number" }
        }
    },
    registration_council: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "council name is needed for creating the profile" }
        }
    },
    registration_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Please provide the registration year" }
        }
    },
    is_approved:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    profile_questions:{
        type:DataTypes.JSON,
        allowNull:true
    },
    total_patients_handled:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    thoughts_i_can_help_with: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    total_earnings: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    discount_on_3_appointments: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    discount_on_5_appointments: {
        type: DataTypes.INTEGER,
        defaultValue: 8
    },
    total_appointments: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_appointments_cancelled: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_appointments_completed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
},{
    timestamps:true,
    underscored: true,
    tableName: 'doctors',
    indexes: [
        { fields: ['id'] }, 
        { fields: ['main_specialization'] }, 
        { fields: ['is_approved'] }, 
        { fields: ['total_appointments_completed'] }, 
        { fields: ['rating'] }, 
        { fields: ['expertise'] }
    ]
});


module.exports = Doctors;
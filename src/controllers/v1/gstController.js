const asyncHandler = require("express-async-handler");
const Doctor = require("../../models/Doctor");
const Gst = require("../../models/Gst");
const sequelize = require("../../config/db");
const {Op} = require("sequelize");


//this function will create a new entry in the GST table, only if there is no entry for the logged in doctor
const createGst = asyncHandler(async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const id = req.user.id;
    const {
      registration_number,
      business_name,
      gstin_status,
      registration_date,
      taxpayer_type,
      business_nature,
      address,
      entity_type
    } = req.body;
      
    if (!id || !registration_number || !business_name || !registration_date || !taxpayer_type || !business_nature || !address || !entity_type) {
      res.status(400);
      throw new Error('All fields are required');
    }

    // Checking if the id or registration_number already exists in the gst table
    const existingGst = await Gst.findOne({
      where: {
        id:id
      }
    });

    if (existingGst) {
      return res.status(409);
      throw new Error('GST number already present in your account');
    }

    // Create a new gst record within the transaction
    const newGst = await Gst.create({
      id,
      registration_number,
      business_name,
      gstin_status,
      registration_date,
      taxpayer_type,
      business_nature,
      address,
      entity_type
    }, { transaction: t });

    // Commit the transaction
    await t.commit();

    // Return success response with the created gst record
    return res.status(201).json({
      message: 'GST record created successfully',
      data: newGst
    });
    
  } catch (error) {
    // If an error occurs, rollback the transaction
    await t.rollback();
    
    console.error(error);
    res.status(500);
    throw new Error('Internal Server Error'|| error.message);
  }
});


// will only be accessed by the admin
const updateGst = asyncHandler(async (req,res)=>{
    const doctorId = req.params.id;
    const {
        registration_number,
        business_name,
        gstin_status,
        registration_date,
        taxpayer_type,
        business_nature,
        address,
        entity_type
    } = req.body;
    // we'll just update the GST number for this doctor.
    const existingGst = await Gst.findOne({ where: { id: doctorId } });
    if (!existingGst) {
        res.status(404)
        throw new Error('GST record not found');
    }
    // Create a new transaction
    const t = await sequelize.transaction();
    try {
        // Update the GST record
        await existingGst.update({
            registration_number,
            business_name,
            gstin_status,
            registration_date,
            taxpayer_type,
            business_nature,
            address,
            entity_type
        }, { transaction: t });

        // Commit the transaction
        await t.commit();
        res.status(200).json({
            success:true,
            message: "GST values updated successfully"
        });
    }catch(err){
        await t.rollback();
        res.status(400);
        throw new Error("Something went wrong");
    }
});

const deleteGstRecord = asyncHandler(async (req, res)=>{
    const id = req.params.id;
    // this id will be the doctor's id
    const existingGst = await Gst.findOne({ where: { id } });
    if (!existingGst) {
        res.status(404)
        throw new Error('GST record not found');
    }
    // Create a new transaction
    const t = await sequelize.transaction();
    try {

        // Delete the GST record
        await existingGst.destroy({ transaction: t });
        // Commit the transaction
        await t.commit();
        res.status(200).json({
            success:true,
            message: "GST record deleted successfully"
        });
    }catch(err){
        await t.rollback();
        res.status(400);
        throw new Error("Something went wrong");
    }
});

// will be accessed by the admin and doctor himself
const getGstByDoctor = asyncHandler(async (req,res)=>{
    const doctorId = req.params.id;
    const gst = await Gst.findOne({ where: { id: doctorId } });
    if (!gst) {
        res.status(404)
        throw new Error('GST record not found');
    }
    res.status(200).json({
        success:true,
        gst:gst
    });
});

module.exports = {
    createGst,
    updateGst,
    deleteGstRecord,
    getGstByDoctor
};
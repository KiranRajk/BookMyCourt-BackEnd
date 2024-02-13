const COURTS = require("../models/courtSchema");
const SCHEDULES = require('../models/courtSchedulesModel')

const createCourt = (req, res) => {
  COURTS({
    courtName: req.query.courtName,
    location: req.query.location,
    address: req.query.address,
    mobileNumber: req.query.mobileNumber,
    description: req.query.description,
    courtPic: req.file.filename,
  })
    .save()
    .then((response) => {
      res.status(200).json("Court Created Successfully");
    })
    .catch((err) => {
      res.status(401).json("Court Creation Failed");
    });
};

const addtimeSlotData = (req, res) => {
  const { startDate, endDate, cost, slots, courtId } = req.body;
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const slotObjects = [];

  while (currentDate <= lastDate) {
    for (let slot of slots) {
      slotObjects.push({
        date: JSON.parse(JSON.stringify(currentDate)),
        slot : {
            name : slot.name,
            id : slot.id
        },
        cost,
        courtId
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  SCHEDULES.insertMany(slotObjects)
  .then((response)=>{
    res.status(200).json("Schedules created successfully")
  })
  .catch((err)=>{
    res.status(500)
  })
};

module.exports = { createCourt, addtimeSlotData };

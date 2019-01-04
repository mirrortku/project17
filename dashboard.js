// const moment = require('moment');

const Hotel = require('../models/hotel');
const Hotelroom = require('../models/hotelroom');
const Member = require('../models/member');
//const User = require('../models/user');

exports.getDashboard = async (req, res, next) => {

  let hotel;
  let hotelCount;
  let hotelroomCount;
  let memberCount;
  let userCount;

  try {
    const getHotelCount = await Hotel.getCount()
      .then(([rows]) => {
        hotelCount = rows[0].count;
      })

    const getHotelroomCount = await Hotelroom.getCount()
      .then(([rows]) => {
        hotelroomCount = rows[0].count;
         console.log('hotelroom count 1: ', hotelroomCount);
      })

      const getMemberCount = await Member.getCount()
      .then(([rows]) => {
        memberCount = rows[0].count;
         console.log('member count 1: ', memberCount);
      })

    let data = {
      hotel: hotel,
      hotelCount: hotelCount,
      hotelroomCount: hotelroomCount,
      memberCount: memberCount,
      // userCount: userCount
    }

    console.log(JSON.stringify(data));
    //res.send(JSON.stringify(data));

    res.render('dashboard', {
      title: 'Dashboard',
      color: 'btn-primary',
      icon: 'fa-cog',
      hotelCount: hotelCount,
      hotelroomCount : hotelroomCount,
      memberCount : memberCount,
      // userCount: userCount
    });

  } catch (err) {
    console.log(err);
  };

};
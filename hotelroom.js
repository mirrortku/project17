//const moment = require('moment');

const Hotelroom = require('../models/hotelroom');

/* READ *****************************/

exports.getHotelroom = (req, res, next) => {
    Hotelroom.fetchAll()
        .then(([rows]) => {
            // for (let p of rows) {
            //     p.date = moment(p.date).format('MMM D, YYYY');
            // }
            console.log(JSON.stringify(rows, ["hrid", "type", "price"]));
            //res.send(JSON.stringify(rows));
            res.render('hotelroom', {
                data: rows,
                title: 'Hotelroom List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDetailHotelroom = async (req, res, next) => {

    let hotelroom;

    const findHotelroomById = await Hotelroom.findById(req.query.hrid)
        .then(([rows]) => {
            // for (let p of rows) {
            //     p.date = moment(p.date).format('YYYY-MM-DD');
            //     console.log('p.date: ', p.date);
            // }
            hotelroom = rows;
            //console.log('doge[0].date: ', doge[0].date);
           //console.log('findDogeById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    console.log('hotelroom: ', JSON.stringify(hotelroom[0].price));
    
    res.render('detailroom', {
        data: hotelroom,
        title: 'Detail Hotelroom',
   });

};

exports.getEditHotelroom = async (req, res, next) => {

    let hotelroom;

    const findHotelroomById = await Hotelroom.findById(req.query.hrid)
        .then(([rows]) => {
            hotelroom = rows;
            //console.log('doge[0].date: ', doge[0].date);
           //console.log('findDogeById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    console.log('hotelroom: ', JSON.stringify(hotelroom[0].price));
    
    res.render('edit', {
        data: hotelroom,
        title: 'Edit Hotelroom',
   });

};

exports.postAddHotelroom = (req, res, next) => {

    Hotelroom.add(req, res)
        .then(([rows]) => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/hotelroom');
        })
        .catch(err => console.log(err));


};


exports.postUpdateHotelroom = (req, res, next) => {
    Hotelroom.updateById(req, res)
        .then(([rows]) => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/hotelroom');
        })
        .catch(err => console.log(err));
};

exports.getDeleteHotelroom = (req, res, next) => {
    Hotelroom.deleteById(req.query.heid)
        .then(([rows]) => {
            res.redirect('/hotelroom');
        })
        .catch();
};
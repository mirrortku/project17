//const moment = require('moment');

const Hotel = require('../models/hotel');

/* READ *****************************/

exports.getHotel = (req, res, next) => {
    Hotel.fetchAll()
        .then(([rows]) => {
            // for (let p of rows) {
            //     p.date = moment(p.date).format('MMM D, YYYY');
            // }
            console.log(JSON.stringify(rows, ["hid", "hname", "evaluation", "comment"]));
            //res.send(JSON.stringify(rows));
            res.render('hotel', {
                data: rows,
                title: 'Hotel List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDetailHotel = async (req, res, next) => {

    let hotel;

    const findHotelById = await Hotel.findById(req.query.hid)
        .then(([rows]) => {
            // for (let p of rows) {
            //     p.date = moment(p.date).format('YYYY-MM-DD');
            //     console.log('p.date: ', p.date);
            // }
            hotel = rows;
            //console.log('doge[0].date: ', doge[0].date);
           //console.log('findDogeById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    console.log('hotel: ', JSON.stringify(hotel[0].hname));
    
    res.render('detail', {
        data: hotel,
        title: 'Detail Hotel',
   });

};

exports.getEditHotel = async (req, res, next) => {

    let hotel;

    const findHotelById = await Hotel.findById(req.query.hid)
        .then(([rows]) => {
            hotel = rows;
            //console.log('doge[0].date: ', doge[0].date);
           //console.log('findDogeById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    console.log('hotel: ', JSON.stringify(hotel[0].hname));
    
    res.render('edit', {
        data: hotel,
        title: 'Edit Hotel',
   });

};

exports.postAddHotel = (req, res, next) => {

    Hotel.add(req, res)
        .then(([rows]) => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/hotel');
        })
        .catch(err => console.log(err));


};


exports.postUpdateHotel = (req, res, next) => {
    Hotel.updateById(req, res)
        .then(([rows]) => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/hotel');
        })
        .catch(err => console.log(err));
};

exports.getDeleteHotel = (req, res, next) => {
    Hotel.deleteById(req.query.hid)
        .then(([rows]) => {
            res.redirect('/hotel');
        })
        .catch();
};
//const moment = require('moment');

const Member = require('../models/member');

/* READ *****************************/

exports.getMember = (req, res, next) => {
    Member.fetchAll()
        .then(([rows]) => {
            // for (let p of rows) {
            //     p.date = moment(p.date).format('MMM D, YYYY');
            // }
            console.log(JSON.stringify(rows, ["mid", "mname", "memail"]));
            //res.send(JSON.stringify(rows));
            res.render('member', {
                data: rows,
                title: 'Member List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDetailMember = async (req, res, next) => {

    let member;

    const findMemberById = await Member.findById(req.query.mid)
        .then(([rows]) => {
            // for (let p of rows) {
            //     p.date = moment(p.date).format('YYYY-MM-DD');
            //     console.log('p.date: ', p.date);
            // }
            member = rows;
            //console.log('doge[0].date: ', doge[0].date);
           //console.log('findDogeById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    console.log('member: ', JSON.stringify(member[0].mname));
    
    res.render('detailmember', {
        data: member,
        title: 'Detail member',
   });

};

exports.getEditMember = async (req, res, next) => {

    let member;

    const findMemberById = await Member.findById(req.query.mid)
        .then(([rows]) => {
            member = rows;
            //console.log('doge[0].date: ', doge[0].date);
           //console.log('findDogeById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    console.log('member: ', JSON.stringify(member[0].mname));
    
    res.render('editmember', {
        data: member,
        title: 'Edit Member',
   });

};

exports.postAddMember = (req, res, next) => {

    Member.add(req, res)
        .then(([rows]) => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/member');
        })
        .catch(err => console.log(err));


};


exports.postUpdateMember = (req, res, next) => {
    Member.updateById(req, res)
        .then(([rows]) => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/member');
        })
        .catch(err => console.log(err));
};

exports.getDeleteMember = (req, res, next) => {
    Member.deleteById(req.query.mid)
        .then(([rows]) => {
            res.redirect('/member');
        })
        .catch();
};
const mongoose = require( 'mongoose' );
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.signup = function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;
    const  avatar = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png';


    if (!name ||  !email || !phonenumber || !password) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }

        if (existingUser) {
            return res.status(201).json({
                success: false,
                message: 'email already exists.'
            });
        }
        let oUser = new User({
            name: name,
            email: email,
            phonenumber: phonenumber,
            password: password,
            avatar: avatar
        });

        oUser.save(function(err) {
            if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }

            res.status(201).json({
                success: true,
                message: 'User created successfully, please login to access your account.'
            });
        });
    });
};

exports.login = function(req, res){
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }

        if (!user) {
            res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
        }else if (user) {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    let token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: config.tokenexp
                    });
                    let lastLogin = user.lastlogin;
                    user.lastlogin = new Date();
                    user.save(function(err) {
                        if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }

                        res.status(201).json({
                            success: true,
                            message: {'userid': user._id, 'email': user.email, 'name': user.name, avatar: user.avatar, 'lastlogin': lastLogin},
                            token: token
                        });
                    });
                } else {
                    res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
                }
            });
        }
    });
};

exports.authenticate = function(req, res, next){
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(201).json({
            success: false,
            message: 'Fatal error, Authenticate token not available.',
            errcode: 'no-token'
        });
    }
};

exports.getuserDetails = function(req, res){
    User.find({_id:req.params.id}).exec(function(err, user){
        if(err){ res.status(400).json({ success: false, message: `Error processing request ${err}`}); }
        res.status(201).json({
            success: true,
            data: user
        });
    });
};

exports.updateUser = function(req, res){
    const name = req.body.name;
    const phonenumber = req.body.phonenumber;
    const userid = req.params.id;
    const avatar = req.body.avatar;

    if (!name || !phonenumber || !avatar || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
        User.findById(userid).exec(function(err, user){
            if(err){ res.status(400).json({ success: false, message: `Error processing request ${err}`}); }

            if(user){
                user.name = name;
                user.phonenumber = phonenumber;
                user.avatar = avatar;

            }
            user.save(function(err){
                if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }
                res.status(201).json({
                    success: true,
                    message: 'User details updated successfully'
                });
            });
        });
    }
};

exports.updatePassword = function(req, res){
    const userid = req.params.id;
    const oldpassword = req.body.oldpassword;
    const password = req.body.password;

    if (!oldpassword || !password || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {

        User.findOne({ _id: userid }, function(err, user) {
            if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }
            if (user) {
                user.comparePassword(oldpassword, function (err, isMatch) {
                    if (isMatch && !err) {

                        user.password = password;

                        user.save(function(err) {
                            if(err){ res.status(400).json({ success: false, message:`Error processing request ${err}`}); }

                            res.status(201).json({
                                success: true,
                                message: 'Password updated successfully'
                            });
                        });
                    } else {
                        res.status(201).json({ success: false, message: 'Incorrect old password.' });
                    }
                });
            }
        });
    }
};
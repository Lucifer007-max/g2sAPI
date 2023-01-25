const express = require('express');
const router = express.Router();
const Joi = require('joi');
const studentService = require('./student.service')
const validateRequest = require('_middleware/validate-request');

router.get('/getstudentID/:id',  studentgetbyID );
router.post('/register', registerSchema, register);
router.post('/authenticate', authenticateSchema, authenticate);
router.get('/getstudent', getallList);
// router.get('/workeventAll' , workeventgetAll);

module.exports = router;


function registerSchema(req, res, next) {
    // req.body.role = "user";
    // req.body.password = makeid();
    // req.body.approved = 0;

    const schema = Joi.object({
        fullname: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email:Joi.any().required(),
        mobileNo:Joi.any(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    studentService.create(req.body)
    .then((data) => res.json(data))
    .catch(next);
}


function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    studentService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function  getallList(req, res, next) {
    studentService.getallList(req.query.page, req.query.limit)
        .then(lists => res.json(lists))
        .catch(next);
}


function studentgetbyID (req , res , next) {
    studentService.studentgetbyID(req.params.id)
    .then((list) => res.json(list))
    .catch(next);
}
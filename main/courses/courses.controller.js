const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const authorize = require('_middleware/authorize');
const courseService = require('./course.service');

// routes
router.get('/courseList' , getcourseList);
router.get('/courseID/:id',  getbyID );
router.post('/create' , authenticateSchema, create);
router.get('/coursesLists' , getActiveCourse)
module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        coursename: Joi.string().required(),
        courseamt: Joi.any().required(),
        courseimage: Joi.any().required(),
        coursestatus: Joi.any().required(),
        courseprofileDetails: Joi.string().required(),
        courseofferDetails: Joi.string().required(),
        courseType: Joi.any().required(),
    });
    validateRequest(req, next, schema);
}


function create(req, res, next) {
    courseService.create(req.body)
        .then(() => res.json({ message: 'Course created successfully' }))
        .catch(next);
}


// function getcourseList (req, res, next) {
//     courseService.getList(req.query.page , req.query.limit)
//     .then(lists => res.json(lists))
//     .catch(next)
// }
function getcourseList(req, res, next){
    courseService.getList(req.query.page , req.query.limit)
    .then(lists => res.json(lists))
    .catch(next)
}
function getActiveCourse(req, res, next){
    courseService.getActiveCourse(req.body)
    .then(lists => res.json(lists))
    .catch(next)
}
function getbyID (req , res , next) {
    courseService.getbyID(req.params.id)
    .then((list) => res.json(list))
    .catch(next);
}